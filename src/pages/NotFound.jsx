import { Link } from 'react-router-dom'
import { FileQuestion, ArrowLeft, Home } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
    return (
        <div className="not-found-page" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--color-text)'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                    maxWidth: '500px',
                    width: '100%'
                }}
            >
                <div style={{
                    color: 'var(--color-accent)',
                    marginBottom: '2rem',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <FileQuestion size={80} strokeWidth={1} />
                </div>

                <h1 style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    fontWeight: '800',
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    404
                </h1>

                <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Page Not Found</h2>

                <p style={{
                    color: 'var(--color-text-muted)',
                    marginBottom: '2.5rem',
                    fontSize: '1.1rem',
                    lineHeight: '1.6'
                }}>
                    Oops! The page you're looking for seems to have wandered off. It might have been moved, deleted, or possibly never existed.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link
                        to="/"
                        className="btn btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Home size={18} />
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-secondary"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
