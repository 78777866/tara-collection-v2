import { useNavigate } from 'react-router-dom'
import { ShieldAlert, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'

export default function AccessDenied() {
    const navigate = useNavigate()
    const { user } = useAuth()

    return (
        <div className="access-denied-page" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center',
            background: 'var(--color-bg)'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                    maxWidth: '500px',
                    width: '100%'
                }}
            >
                <div style={{
                    color: 'var(--color-error)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <ShieldAlert size={80} strokeWidth={1.5} />
                </div>

                <h1 style={{ marginBottom: '1rem' }}>Access Restricted</h1>

                <p style={{
                    color: 'var(--color-text-muted)',
                    marginBottom: '2rem',
                    fontSize: '1.1rem',
                    lineHeight: '1.6'
                }}>
                    This area is restricted to administrators only.
                    {user ? ` As ${user.email}, you do not have the required permissions.` : ' You must be logged in as an administrator to continue.'}
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => navigate('/')}
                        className="btn btn-secondary"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <ArrowLeft size={18} />
                        Return Home
                    </button>

                    {user && (
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="btn btn-primary"
                        >
                            Go to Dashboard
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
