import { useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    LayoutDashboard,
    Package,
    Tag,
    ShoppingCart,
    Calendar,
    Users,
    LogOut,
    Menu,
    X,
    Settings,
    Shield
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import AccessDenied from '../AccessDenied'
import './AdminLayout.css'

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: Tag, label: 'Discounts', path: '/admin/discounts' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: Calendar, label: 'Bookings', path: '/admin/bookings' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Shield, label: 'Team', path: '/admin/team' },
]

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { user, isAdmin, loading, signOut } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('[AdminLayout] Checking access:', { loading, user: user?.id, isAdmin })
        if (!loading && !user) {
            console.log('[AdminLayout] No user, redirecting to /auth')
            navigate('/auth')
        }
    }, [user, loading, navigate, isAdmin])

    const handleSignOut = async () => {
        await signOut()
        navigate('/')
    }

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="spinner" />
                <p>Loading...</p>
            </div>
        )
    }

    if (!isAdmin) {
        return <AccessDenied />
    }

    return (
        <div className="admin">
            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
                <div className="admin-sidebar__header">
                    <a href="/" className="admin-logo">
                        <span className="admin-logo__text">Tara</span>
                        <span className="admin-logo__badge">Admin</span>
                    </a>
                </div>

                <nav className="admin-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin'}
                            className={({ isActive }) =>
                                `admin-nav__item ${isActive ? 'admin-nav__item--active' : ''}`
                            }
                            onClick={() => setSidebarOpen(false)}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="admin-sidebar__footer">
                    <button className="admin-nav__item admin-nav__item--logout" onClick={handleSignOut}>
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="admin-mobile-header">
                <button
                    className="admin-mobile-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <span className="admin-mobile-title">Admin Panel</span>
            </header>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="admin-overlay"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="admin-main">
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
