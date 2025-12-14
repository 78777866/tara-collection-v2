import { useState } from 'react'
import { Plus, Edit, Trash2, Calendar } from 'lucide-react'

const discountsData = [
    { id: 1, code: 'RAYA2024', type: 'Percentage', value: '15%', startDate: '2024-12-01', endDate: '2024-12-31', status: 'Active' },
    { id: 2, code: 'NEWUSER', type: 'Fixed', value: 'RM 50', startDate: '2024-01-01', endDate: '2024-12-31', status: 'Active' },
    { id: 3, code: 'EXPRESS10', type: 'Percentage', value: '10%', startDate: '2024-12-01', endDate: '2024-12-15', status: 'Expired' },
]

export default function Discounts() {
    const [discounts] = useState(discountsData)

    return (
        <div className="admin-discounts">
            <div className="admin-page-header">
                <h1>Discounts & Promotions</h1>
                <button className="btn btn-secondary">
                    <Plus size={18} />
                    Create Discount
                </button>
            </div>

            <div className="admin-section">
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Type</th>
                                <th>Value</th>
                                <th>Valid Period</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {discounts.map((discount) => (
                                <tr key={discount.id}>
                                    <td><code className="discount-code">{discount.code}</code></td>
                                    <td>{discount.type}</td>
                                    <td><strong>{discount.value}</strong></td>
                                    <td>
                                        <span className="date-range">
                                            <Calendar size={14} />
                                            {discount.startDate} - {discount.endDate}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge status-badge--${discount.status.toLowerCase()}`}>
                                            {discount.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="table-action-btn" title="Edit"><Edit size={16} /></button>
                                            <button className="table-action-btn table-action-btn--danger" title="Delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{`
        .discount-code {
          padding: var(--space-1) var(--space-2);
          background: var(--color-accent);
          border-radius: var(--radius-sm);
          font-family: monospace;
          font-weight: var(--font-semibold);
        }

        .date-range {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
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
        }

        .status-badge--active {
          background: rgba(34, 197, 94, 0.1);
          color: var(--color-success);
        }

        .status-badge--expired {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }
      `}</style>
        </div>
    )
}
