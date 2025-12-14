import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, ShoppingBag, ChevronDown, LogOut, LayoutDashboard, Settings } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import './Navbar.css'

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/products' },
    { name: 'Book Fitting', path: '/booking' },
]

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const { user, profile, isAdmin, signOut, loading } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsMobileMenuOpen(false)
        setIsUserMenuOpen(false)
    }, [location.pathname])

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }

    return (
        <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__container container">
                {/* Logo */}
                <Link to="/" className="navbar__logo">
                    <span className="navbar__logo-text">Tara</span>
                    <span className="navbar__logo-accent">Collection</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="navbar__nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="navbar__actions">
                    {!loading && (
                        <>
                            {user ? (
                                <div className="navbar__user-menu">
                                    <button
                                        className="navbar__user-trigger"
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    >
                                        <div className="navbar__avatar">
                                            {profile?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                        <span className="navbar__user-name">
                                            {profile?.full_name || 'Account'}
                                        </span>
                                        <ChevronDown size={16} />
                                    </button>

                                    <AnimatePresence>
                                        {isUserMenuOpen && (
                                            <motion.div
                                                className="navbar__dropdown glass"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {isAdmin && (
                                                    <Link to="/admin" className="navbar__dropdown-item">
                                                        <Settings size={18} />
                                                        Admin Panel
                                                    </Link>
                                                )}
                                                <Link to="/dashboard" className="navbar__dropdown-item">
                                                    <LayoutDashboard size={18} />
                                                    Dashboard
                                                </Link>
                                                <Link to="/dashboard/orders" className="navbar__dropdown-item">
                                                    <ShoppingBag size={18} />
                                                    My Orders
                                                </Link>
                                                <Link to="/dashboard/profile" className="navbar__dropdown-item">
                                                    <User size={18} />
                                                    Profile
                                                </Link>
                                                <hr className="navbar__dropdown-divider" />
                                                <button
                                                    className="navbar__dropdown-item navbar__dropdown-item--danger"
                                                    onClick={handleSignOut}
                                                >
                                                    <LogOut size={18} />
                                                    Sign Out
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link to="/auth" className="btn btn-secondary btn-sm">
                                    Sign In
                                </Link>
                            )}
                        </>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="navbar__mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="navbar__mobile-menu glass-dark"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="navbar__mobile-links">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`navbar__mobile-link ${location.pathname === link.path ? 'navbar__mobile-link--active' : ''}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {user ? (
                                <>
                                    <hr className="navbar__mobile-divider" />
                                    {isAdmin && (
                                        <Link to="/admin" className="navbar__mobile-link">
                                            Admin Panel
                                        </Link>
                                    )}
                                    <Link to="/dashboard" className="navbar__mobile-link">
                                        Dashboard
                                    </Link>
                                    <button
                                        className="navbar__mobile-link navbar__mobile-link--danger"
                                        onClick={handleSignOut}
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <Link to="/auth" className="btn btn-secondary navbar__mobile-cta">
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
