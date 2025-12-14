import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import './Auth.css'

export default function Auth() {
    const [mode, setMode] = useState('signin') // 'signin' | 'signup' | 'forgot'
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
    })

    const { signIn, signUp, resetPassword } = useAuth()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')

        try {
            if (mode === 'signin') {
                const { data, error } = await signIn(formData.email, formData.password)
                if (error) throw error

                // Check user role for redirect
                if (data?.user) {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('role')
                        .eq('id', data.user.id)
                        .single()

                    if (profile?.role === 'admin') {
                        navigate('/admin')
                    } else {
                        navigate('/dashboard')
                    }
                }
            } else if (mode === 'signup') {
                if (formData.password !== formData.confirmPassword) {
                    throw new Error('Passwords do not match')
                }
                if (formData.password.length < 8) {
                    throw new Error('Password must be at least 8 characters')
                }
                const { error } = await signUp(formData.email, formData.password, {
                    full_name: formData.name
                })
                if (error) throw error
                setSuccess('Account created! Please check your email to verify your account.')
                setMode('signin')
            } else if (mode === 'forgot') {
                const { error } = await resetPassword(formData.email)
                if (error) throw error
                setSuccess('Password reset link sent to your email.')
            }
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                {/* Left Side - Branding */}
                <div className="auth-branding">
                    <div className="auth-branding__content">
                        <Link to="/" className="auth-logo">
                            <span className="auth-logo__text">Tara</span>
                            <span className="auth-logo__accent">Collection</span>
                        </Link>
                        <h2>Experience Premium Tailoring</h2>
                        <p>
                            Join thousands of satisfied customers who trust us for their
                            special occasions. Custom Baju Kurung, Baju Melayu, and more -
                            crafted with precision and delivered in 48 hours.
                        </p>
                        <div className="auth-features">
                            <div className="auth-feature">
                                <div className="auth-feature__icon">✨</div>
                                <span>Premium Quality Fabrics</span>
                            </div>
                            <div className="auth-feature">
                                <div className="auth-feature__icon">⚡</div>
                                <span>48-Hour Express Delivery</span>
                            </div>
                            <div className="auth-feature">
                                <div className="auth-feature__icon">👔</div>
                                <span>20+ Master Tailors</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="auth-form-container">
                    <motion.div
                        key={mode}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="auth-form-wrapper"
                    >
                        <div className="auth-form-header">
                            <h1>
                                {mode === 'signin' && 'Welcome Back'}
                                {mode === 'signup' && 'Create Account'}
                                {mode === 'forgot' && 'Reset Password'}
                            </h1>
                            <p>
                                {mode === 'signin' && 'Sign in to access your account'}
                                {mode === 'signup' && 'Join Tara Collection today'}
                                {mode === 'forgot' && "Enter your email and we'll send you a reset link"}
                            </p>
                        </div>

                        {error && (
                            <div className="auth-alert auth-alert--error">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="auth-alert auth-alert--success">
                                {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="auth-form">
                            {mode === 'signup' && (
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <div className="input-wrapper">
                                        <User size={18} />
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            required
                                            className="input"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <div className="input-wrapper">
                                    <Mail size={18} />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="your@email.com"
                                        required
                                        className="input"
                                    />
                                </div>
                            </div>

                            {mode !== 'forgot' && (
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <div className="input-wrapper">
                                        <Lock size={18} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="••••••••"
                                            required
                                            minLength={8}
                                            className="input"
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {mode === 'signup' && (
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <div className="input-wrapper">
                                        <Lock size={18} />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="••••••••"
                                            required
                                            minLength={8}
                                            className="input"
                                        />
                                    </div>
                                </div>
                            )}

                            {mode === 'signin' && (
                                <div className="form-options">
                                    <label className="checkbox-label">
                                        <input type="checkbox" />
                                        <span>Remember me</span>
                                    </label>
                                    <button
                                        type="button"
                                        className="link-button"
                                        onClick={() => setMode('forgot')}
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn btn-secondary btn-lg auth-submit"
                                disabled={loading}
                            >
                                {loading ? 'Please wait...' : (
                                    <>
                                        {mode === 'signin' && 'Sign In'}
                                        {mode === 'signup' && 'Create Account'}
                                        {mode === 'forgot' && 'Send Reset Link'}
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="auth-footer">
                            {mode === 'signin' && (
                                <p>
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        className="link-button"
                                        onClick={() => setMode('signup')}
                                    >
                                        Sign up
                                    </button>
                                </p>
                            )}
                            {mode === 'signup' && (
                                <p>
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        className="link-button"
                                        onClick={() => setMode('signin')}
                                    >
                                        Sign in
                                    </button>
                                </p>
                            )}
                            {mode === 'forgot' && (
                                <p>
                                    Remember your password?{' '}
                                    <button
                                        type="button"
                                        className="link-button"
                                        onClick={() => setMode('signin')}
                                    >
                                        Sign in
                                    </button>
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
