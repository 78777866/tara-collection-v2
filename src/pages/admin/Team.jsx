import { useState, useEffect } from 'react'
import { Search, Shield, UserPlus, Trash2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

export default function Team() {
    const [admins, setAdmins] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const { user } = useAuth()

    useEffect(() => {
        fetchAdmins()
    }, [])

    const fetchAdmins = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('role', 'admin')
                .order('created_at', { ascending: false })

            if (error) throw error
            setAdmins(data)
        } catch (error) {
            console.error('Error fetching admins:', error)
        } finally {
            setLoading(false)
        }
    }

    const demoteAdmin = async (userId) => {
        if (!window.confirm('Are you sure you want to remove admin access for this user?')) return

        try {
            const { error } = await supabase
                .from('profiles')
                .update({ role: 'customer' })
                .eq('id', userId)

            if (error) throw error

            // Refresh list
            fetchAdmins()
        } catch (error) {
            console.error('Error removing admin:', error)
            alert('Failed to remove admin')
        }
    }

    const filteredAdmins = admins.filter(admin =>
        (admin.full_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (admin.email?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    )

    return (
        <div className="admin-team">
            <div className="admin-page-header">
                <div>
                    <h1>Team Management</h1>
                    <p className="text-muted">Manage administrators and staff access</p>
                </div>
                <button className="btn btn-primary" onClick={() => alert('To add an admin, go to Users list and promote a user.')}>
                    <UserPlus size={18} />
                    <span>Add Admin</span>
                </button>
            </div>

            <div className="admin-section">
                <div className="admin-toolbar">
                    <div className="admin-search">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search team..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input"
                        />
                    </div>
                </div>

                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Admin User</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" className="text-center p-4">Loading team...</td></tr>
                            ) : filteredAdmins.length === 0 ? (
                                <tr><td colSpan="4" className="text-center p-4">No team members found</td></tr>
                            ) : (
                                filteredAdmins.map((admin) => (
                                    <tr key={admin.id}>
                                        <td>
                                            <div className="user-cell">
                                                <div className="user-avatar">
                                                    {admin.full_name?.[0] || 'A'}
                                                </div>
                                                <div>
                                                    <div className="font-medium">{admin.full_name || 'Unnamed Admin'}</div>
                                                    <div className="text-xs text-muted">ID: {admin.id.slice(0, 8)}...</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="status-badge status-badge--active">
                                                <Shield size={12} style={{ marginRight: 4, display: 'inline' }} />
                                                Admin
                                            </span>
                                        </td>
                                        <td>{new Date(admin.created_at).toLocaleDateString()}</td>
                                        <td>
                                            {admin.id !== user?.id && (
                                                <button
                                                    className="table-action-btn table-action-btn--danger"
                                                    title="Remove Admin Access"
                                                    onClick={() => demoteAdmin(admin.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{`
                .user-cell {
                    display: flex;
                    align-items: center;
                    gap: var(--space-3);
                }
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--color-primary);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                }
            `}</style>
        </div>
    )
}
