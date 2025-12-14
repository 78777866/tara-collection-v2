import { ShoppingBag, Calendar, Ruler, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const statsCards = [
    { icon: ShoppingBag, label: 'Active Orders', value: '2', color: 'primary' },
    { icon: Calendar, label: 'Upcoming Appointments', value: '1', color: 'secondary' },
    { icon: Ruler, label: 'Saved Measurements', value: '3', color: 'accent' },
    { icon: Tag, label: 'Available Discounts', value: '5%', color: 'success' },
]

const recentOrders = [
    { id: 'ORD-2024-001', item: 'Baju Kurung Modern', status: 'In Production', date: '2024-12-10' },
    { id: 'ORD-2024-002', item: 'Baju Melayu Classic', status: 'Pending', date: '2024-12-12' },
]

export default function Overview() {
    const { profile } = useAuth()

    return (
        <div className="dashboard-overview">
            <div className="dashboard-page-header">
                <h1>Welcome back, {profile?.full_name?.split(' ')[0] || 'there'}!</h1>
                <p>Here's what's happening with your orders and appointments.</p>
            </div>

            {/* Stats Cards */}
            <div className="dashboard-cards">
                {statsCards.map((card, index) => (
                    <div key={index} className="dashboard-card">
                        <div className="dashboard-card__header">
                            <div className="dashboard-card__icon">
                                <card.icon size={24} />
                            </div>
                        </div>
                        <div className="dashboard-card__value">{card.value}</div>
                        <div className="dashboard-card__label">{card.label}</div>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="dashboard-section">
                <div className="dashboard-section__header">
                    <h2>Recent Orders</h2>
                    <Link to="/dashboard/orders" className="link-button">View All</Link>
                </div>
                <div className="dashboard-table-wrapper">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Item</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id}>
                                    <td><strong>{order.id}</strong></td>
                                    <td>{order.item}</td>
                                    <td>
                                        <span className={`status-badge status-badge--${order.status.toLowerCase().replace(' ', '-')}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-section">
                <h2>Quick Actions</h2>
                <div className="quick-actions">
                    <Link to="/products" className="quick-action card">
                        <ShoppingBag size={24} />
                        <span>Browse Collections</span>
                    </Link>
                    <Link to="/booking" className="quick-action card">
                        <Calendar size={24} />
                        <span>Book Fitting</span>
                    </Link>
                    <Link to="/dashboard/measurements" className="quick-action card">
                        <Ruler size={24} />
                        <span>Update Measurements</span>
                    </Link>
                </div>
            </div>

            <style>{`
        .dashboard-section {
          background: var(--color-surface);
          padding: var(--space-6);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          margin-bottom: var(--space-6);
        }

        .dashboard-section__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }

        .dashboard-section h2 {
          font-size: var(--text-lg);
          margin: 0;
        }

        .link-button {
          font-size: var(--text-sm);
          color: var(--color-secondary);
          text-decoration: none;
        }

        .link-button:hover {
          text-decoration: underline;
        }

        .dashboard-table-wrapper {
          overflow-x: auto;
        }

        .dashboard-table {
          width: 100%;
          border-collapse: collapse;
        }

        .dashboard-table th,
        .dashboard-table td {
          padding: var(--space-3) var(--space-4);
          text-align: left;
          border-bottom: 1px solid var(--color-accent);
        }

        .dashboard-table th {
          font-size: var(--text-sm);
          font-weight: var(--font-semibold);
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .dashboard-table td {
          font-size: var(--text-sm);
        }

        .status-badge {
          display: inline-block;
          padding: var(--space-1) var(--space-3);
          font-size: var(--text-xs);
          font-weight: var(--font-semibold);
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }

        .status-badge--pending {
          background: rgba(245, 158, 11, 0.1);
          color: var(--color-warning);
        }

        .status-badge--in-production {
          background: rgba(59, 130, 246, 0.1);
          color: var(--color-info);
        }

        .status-badge--completed {
          background: rgba(34, 197, 94, 0.1);
          color: var(--color-success);
        }

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: var(--space-4);
        }

        .quick-action {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-6);
          text-align: center;
          text-decoration: none;
          color: var(--color-text-primary);
          transition: all var(--transition-fast);
        }

        .quick-action:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .quick-action svg {
          color: var(--color-secondary);
        }
      `}</style>
        </div>
    )
}
