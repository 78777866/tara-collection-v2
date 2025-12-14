import { useState } from 'react'
import { Save, Mail, Lock, User } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function Profile() {
    const { user, profile, updatePassword } = useAuth()
    const [profileData, setProfileData] = useState({
        fullName: profile?.full_name || '',
        phone: profile?.phone || '',
    })
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [saved, setSaved] = useState(false)

    const handleProfileSave = () => {
        console.log('Saving profile:', profileData)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault()
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Passwords do not match')
            return
        }
        try {
            await updatePassword(passwordData.newPassword)
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
            alert('Password updated successfully')
        } catch (error) {
            alert('Error updating password')
        }
    }

    return (
        <div className="dashboard-profile">
            <div className="dashboard-page-header">
                <h1>Profile Settings</h1>
                <p>Manage your account information</p>
            </div>

            <div className="profile-content">
                {/* Personal Info */}
                <div className="dashboard-section">
                    <h2>
                        <User size={20} />
                        Personal Information
                    </h2>
                    <div className="profile-form">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                value={profileData.fullName}
                                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                                className="input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={user?.email || ''}
                                disabled
                                className="input input--disabled"
                            />
                            <span className="form-hint">Email cannot be changed</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                placeholder="+60 12-345 6789"
                                className="input"
                            />
                        </div>
                        <button className="btn btn-secondary" onClick={handleProfileSave}>
                            <Save size={18} />
                            {saved ? 'Saved!' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                {/* Password */}
                <div className="dashboard-section">
                    <h2>
                        <Lock size={20} />
                        Change Password
                    </h2>
                    <form className="profile-form" onSubmit={handlePasswordChange}>
                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                minLength={8}
                                className="input"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                minLength={8}
                                className="input"
                            />
                        </div>
                        <button type="submit" className="btn btn-secondary">
                            <Lock size={18} />
                            Update Password
                        </button>
                    </form>
                </div>
            </div>

            <style>{`
        .profile-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
          max-width: 600px;
        }

        .dashboard-section {
          background: var(--color-surface);
          padding: var(--space-6);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }

        .dashboard-section h2 {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-lg);
          margin-bottom: var(--space-5);
          padding-bottom: var(--space-4);
          border-bottom: 1px solid var(--color-accent);
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: var(--font-medium);
          margin-bottom: var(--space-2);
        }

        .input--disabled {
          background: var(--color-accent-light);
          cursor: not-allowed;
        }

        .form-hint {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
          margin-top: var(--space-1);
        }
      `}</style>
        </div>
    )
}
