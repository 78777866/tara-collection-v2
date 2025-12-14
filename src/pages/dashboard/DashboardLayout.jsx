import { useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    LayoutDashboard,
    ShoppingBag,
    Ruler,
    Calendar,
    User,
    LogOut,
    Menu,
    X
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './DashboardLayout.css'

const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: ShoppingBag, label: 'My Orders', path: '/dashboard/orders' },
    { icon: Ruler, label: 'Measurements', path: '/dashboard/measurements' },
    { icon: Calendar, label: 'Bookings', path: '/dashboard/bookings' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
]

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { user, profile, loading, signOut } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && !user) {
            navigate('/auth')
        }
    }, [user, loading, navigate])

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner" />
                <p>Loading...</p>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="dashboard">
            {/* Mobile Header */}
            <header className="dashboard-mobile-header">
                <button
                    className="dashboard-mobile-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <span className="dashboard-mobile-title">Dashboard</span>
                <div className="dashboard-mobile-avatar">
                    {profile?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                </div>
            </header>

            {/* Sidebar */}
            <aside className={`dashboard-sidebar ${sidebarOpen ? 'dashboard-sidebar--open' : ''}`}>
                <div className="dashboard-sidebar__header">
                    <a href="/" className="dashboard-logo">
                        <span className="dashboard-logo__text">Tara</span>
                        <span className="dashboard-logo__accent">Collection</span>
                    </a>
                </div>

                <div className="dashboard-sidebar__profile">
                    <div className="dashboard-avatar">
                        {profile?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="dashboard-user-info">
                        <span className="dashboard-user-name">
                            {profile?.full_name || 'Welcome'}
                        </span>
                        <span className="dashboard-user-email">{user.email}</span>
                    </div>
                </div>

                <nav className="dashboard-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/dashboard'}
                            className={({ isActive }) =>
                                `dashboard-nav__item ${isActive ? 'dashboard-nav__item--active' : ''}`
                            }
                            onClick={() => setSidebarOpen(false)}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="dashboard-sidebar__footer">
                    <button className="dashboard-nav__item dashboard-nav__item--logout" onClick={handleSignOut}>
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="dashboard-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="dashboard-main">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    )
}
