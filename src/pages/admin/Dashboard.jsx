import { ShoppingCart, Package, Users, DollarSign, TrendingUp, Clock } from 'lucide-react'

const stats = [
    { icon: ShoppingCart, label: 'Orders Today', value: '12', change: '+8%', color: 'primary' },
    { icon: DollarSign, label: 'Revenue', value: 'RM 8,450', change: '+15%', color: 'success' },
    { icon: Package, label: 'Products', value: '48', color: 'info' },
    { icon: Users, label: 'Customers', value: '1,284', change: '+23%', color: 'secondary' },
]

const recentOrders = [
    { id: 'ORD-001', customer: 'Aisyah Rahman', item: 'Baju Kurung Modern', status: 'Pending', amount: 500 },
    { id: 'ORD-002', customer: 'Ahmad Faizal', item: 'Baju Melayu Classic', status: 'In Production', amount: 420 },
    { id: 'ORD-003', customer: 'Priya Kumar', item: 'Silk Saree', status: 'Ready', amount: 890 },
    { id: 'ORD-004', customer: 'Mei Ling', item: 'Kebaya Lace', status: 'Completed', amount: 480 },
]

export default function Dashboard() {
    return (
        <div className="admin-dashboard">
            <div className="admin-page-header">
                <h1>Dashboard</h1>
                <div className="header-date">
                    <Clock size={16} />
                    {new Date().toLocaleDateString('en-MY', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="admin-stats">
                {stats.map((stat, index) => (
                    <div key={index} className="admin-stat-card">
                        <div className="admin-stat-card__header">
                            <div className="admin-stat-card__icon">
                                <stat.icon size={20} />
                            </div>
                            {stat.change && (
                                <span className="stat-change stat-change--positive">
                                    <TrendingUp size={14} />
                                    {stat.change}
                                </span>
                            )}
                        </div>
                        <div className="admin-stat-card__value">{stat.value}</div>
                        <div className="admin-stat-card__label">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="admin-section">
                <div className="admin-section__header">
                    <h2>Recent Orders</h2>
                    <a href="/admin/orders" className="view-all-link">View All →</a>
                </div>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Item</th>
                                <th>Status</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id}>
                                    <td><strong>{order.id}</strong></td>
                                    <td>{order.customer}</td>
                                    <td>{order.item}</td>
                                    <td>
                                        <span className={`status-badge status-badge--${order.status.toLowerCase().replace(' ', '-')}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>RM {order.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{`
        .header-date {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .stat-change {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-xs);
          font-weight: var(--font-semibold);
          padding: var(--space-1) var(--space-2);
          border-radius: var(--radius-full);
        }

        .stat-change--positive {
          background: rgba(34, 197, 94, 0.1);
          color: var(--color-success);
        }

        .view-all-link {
          font-size: var(--text-sm);
          color: var(--color-secondary);
          text-decoration: none;
        }

        .view-all-link:hover {
          text-decoration: underline;
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

        .status-badge--ready {
          background: rgba(139, 92, 246, 0.1);
          color: #8b5cf6;
        }

        .status-badge--completed {
          background: rgba(34, 197, 94, 0.1);
          color: var(--color-success);
        }
      `}</style>
        </div>
    )
}
