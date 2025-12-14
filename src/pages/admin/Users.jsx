import { useState, useEffect } from 'react'
import { Search, Eye, Ban, Shield } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const promoteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to promote this user to Admin?')) return

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', userId)

      if (error) throw error

      // Refresh list
      fetchUsers()
      alert('User promoted to Admin successfully')
    } catch (error) {
      console.error('Error promoting user:', error)
      alert('Failed to promote user')
    }
  }

  const filteredUsers = users.filter(u =>
    (u.full_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (u.email?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  )

  return (
    <div className="admin-users">
      <div className="admin-page-header">
        <h1>Users</h1>
      </div>

      <div className="admin-section">
        <div className="admin-toolbar">
          <div className="admin-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
            />
          </div>
          <span className="results-count">{filteredUsers.length} users</span>
        </div>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center p-4">Loading users...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan="4" className="text-center p-4">No users found</td></tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">
                          {user.full_name?.[0] || 'U'}
                        </div>
                        <div>
                          <div><strong>{user.full_name || 'Unnamed User'}</strong></div>
                          <div className="text-muted">ID: {user.id.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${user.role === 'admin' ? 'status-badge--active' : ''}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className="table-actions">
                        {user.role !== 'admin' && (
                          <button
                            className="table-action-btn"
                            title="Promote to Admin"
                            onClick={() => promoteUser(user.id)}
                          >
                            <Shield size={16} />
                          </button>
                        )}
                        <button className="table-action-btn" title="View Details"><Eye size={16} /></button>
                        <button className="table-action-btn table-action-btn--danger" title="Disable Account"><Ban size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .admin-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-5);
        }

        .admin-search {
          position: relative;
          display: flex;
          align-items: center;
        }

        .admin-search svg {
          position: absolute;
          left: var(--space-3);
          color: var(--color-text-muted);
        }

        .admin-search .input {
          padding-left: var(--space-10);
          max-width: 300px;
        }

        .results-count {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-primary);
          color: var(--color-text-inverse);
          font-weight: var(--font-bold);
          border-radius: var(--radius-full);
        }

        .text-muted {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
        }

        .table-actions {
          display: flex;
          gap: var(--space-2);
        }

        .table-action-btn {
          padding: var(--space-2);
          background: var(--color-accent-light);
          border: none;
          border-radius: var(--radius-md);
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .table-action-btn:hover {
          background: var(--color-accent);
          color: var(--color-primary);
        }

        .table-action-btn--danger:hover {
          background: rgba(239, 68, 68, 0.1);
          color: var(--color-error);
        }

        .status-badge {
          display: inline-block;
          padding: var(--space-1) var(--space-3);
          font-size: var(--text-xs);
          font-weight: var(--font-semibold);
          border-radius: var(--radius-full);
          text-transform: uppercase;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
        }

        .status-badge--active { 
            background: rgba(34, 197, 94, 0.1); 
            color: var(--color-success); 
            border-color: transparent;
        }
      `}</style>
    </div>
  )
}
