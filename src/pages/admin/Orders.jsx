import { useState } from 'react'
import { Eye, Filter, ChevronDown } from 'lucide-react'

const ordersData = [
    { id: 'ORD-001', customer: 'Aisyah Rahman', email: 'aisyah@email.com', item: 'Baju Kurung Modern', amount: 500, status: 'Pending', date: '2024-12-14' },
    { id: 'ORD-002', customer: 'Ahmad Faizal', email: 'ahmad@email.com', item: 'Baju Melayu Classic', amount: 420, status: 'In Production', date: '2024-12-13' },
    { id: 'ORD-003', customer: 'Priya Kumar', email: 'priya@email.com', item: 'Silk Saree', amount: 890, status: 'Ready', date: '2024-12-12' },
    { id: 'ORD-004', customer: 'Mei Ling', email: 'mei@email.com', item: 'Kebaya Lace', amount: 480, status: 'Completed', date: '2024-12-10' },
]

const statusOptions = ['Pending', 'In Production', 'Ready', 'Completed']

export default function Orders() {
    const [orders] = useState(ordersData)
    const [statusFilter, setStatusFilter] = useState('All')

    const filteredOrders = statusFilter === 'All'
        ? orders
        : orders.filter(o => o.status === statusFilter)

    return (
        <div className="admin-orders">
            <div className="admin-page-header">
                <h1>Orders</h1>
            </div>

            <div className="admin-section">
                <div className="admin-toolbar">
                    <div className="filter-group">
                        <Filter size={16} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="input"
                        >
                            <option value="All">All Status</option>
                            {statusOptions.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                    <span className="results-count">{filteredOrders.length} orders</span>
                </div>

                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Item</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.id}>
                                    <td><strong>{order.id}</strong></td>
                                    <td>
                                        <div>{order.customer}</div>
                                        <div className="text-muted">{order.email}</div>
                                    </td>
                                    <td>{order.item}</td>
                                    <td>RM {order.amount}</td>
                                    <td>
                                        <div className="status-dropdown">
                                            <span className={`status-badge status-badge--${order.status.toLowerCase().replace(' ', '-')}`}>
                                                {order.status}
                                            </span>
                                            <ChevronDown size={14} />
                                        </div>
                                    </td>
                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                    <td>
                                        <button className="table-action-btn" title="View Details">
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
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

        .filter-group {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .filter-group .input {
          width: 160px;
        }

        .results-count {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .text-muted {
          font-size: var(--text-xs);
          color: var(--color-text-muted);
        }

        .status-dropdown {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          cursor: pointer;
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

        .status-badge {
          display: inline-block;
          padding: var(--space-1) var(--space-3);
          font-size: var(--text-xs);
          font-weight: var(--font-semibold);
          border-radius: var(--radius-full);
          text-transform: uppercase;
        }

        .status-badge--pending { background: rgba(245, 158, 11, 0.1); color: var(--color-warning); }
        .status-badge--in-production { background: rgba(59, 130, 246, 0.1); color: var(--color-info); }
        .status-badge--ready { background: rgba(139, 92, 246, 0.1); color: #8b5cf6; }
        .status-badge--completed { background: rgba(34, 197, 94, 0.1); color: var(--color-success); }
      `}</style>
        </div>
    )
}
