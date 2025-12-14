import { useState } from 'react'
import { Eye, Download, RefreshCw } from 'lucide-react'

const ordersData = [
    {
        id: 'ORD-2024-001',
        item: 'Baju Kurung Modern',
        price: 500,
        status: 'In Production',
        date: '2024-12-10',
        fabric: 'Silk Blend',
        style: 'Modern Slim'
    },
    {
        id: 'ORD-2024-002',
        item: 'Baju Melayu Classic',
        price: 420,
        status: 'Pending',
        date: '2024-12-12',
        fabric: 'Cotton Lawn',
        style: 'Classic'
    },
    {
        id: 'ORD-2024-003',
        item: 'Premium Songket Kurung',
        price: 1100,
        status: 'Completed',
        date: '2024-11-28',
        fabric: 'Songket',
        style: 'A-Line'
    },
]

export default function Orders() {
    const [selectedOrder, setSelectedOrder] = useState(null)

    return (
        <div className="dashboard-orders">
            <div className="dashboard-page-header">
                <h1>My Orders</h1>
                <p>Track and manage your tailoring orders</p>
            </div>

            <div className="orders-content">
                <div className="dashboard-section">
                    <div className="dashboard-table-wrapper">
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersData.map((order) => (
                                    <tr key={order.id}>
                                        <td><strong>{order.id}</strong></td>
                                        <td>{order.item}</td>
                                        <td>RM {order.price}</td>
                                        <td>
                                            <span className={`status-badge status-badge--${order.status.toLowerCase().replace(' ', '-')}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>{new Date(order.date).toLocaleDateString()}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="table-action-btn"
                                                    onClick={() => setSelectedOrder(order)}
                                                    title="View Details"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button className="table-action-btn" title="Reorder">
                                                    <RefreshCw size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Order Detail Modal */}
            {selectedOrder && (
                <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Order Details</h3>
                            <button className="modal-close" onClick={() => setSelectedOrder(null)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="order-detail-grid">
                                <div><strong>Order ID:</strong> {selectedOrder.id}</div>
                                <div><strong>Status:</strong> {selectedOrder.status}</div>
                                <div><strong>Item:</strong> {selectedOrder.item}</div>
                                <div><strong>Price:</strong> RM {selectedOrder.price}</div>
                                <div><strong>Fabric:</strong> {selectedOrder.fabric}</div>
                                <div><strong>Style:</strong> {selectedOrder.style}</div>
                                <div><strong>Order Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-ghost" onClick={() => setSelectedOrder(null)}>Close</button>
                            <button className="btn btn-secondary">
                                <Download size={16} />
                                Download Receipt
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        .orders-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .dashboard-section {
          background: var(--color-surface);
          padding: var(--space-6);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
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

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: var(--z-modal);
          padding: var(--space-4);
        }

        .modal {
          background: var(--color-surface);
          border-radius: var(--radius-xl);
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-5);
          border-bottom: 1px solid var(--color-accent);
        }

        .modal-header h3 {
          font-size: var(--text-lg);
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          color: var(--color-text-secondary);
          cursor: pointer;
        }

        .modal-body {
          padding: var(--space-5);
        }

        .order-detail-grid {
          display: grid;
          gap: var(--space-3);
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: var(--space-3);
          padding: var(--space-5);
          border-top: 1px solid var(--color-accent);
        }
      `}</style>
        </div>
    )
}
