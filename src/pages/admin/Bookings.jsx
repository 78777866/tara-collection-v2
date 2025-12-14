import { Calendar, MapPin, Video, Check, X } from 'lucide-react'

const bookingsData = [
    { id: 1, customer: 'Aisyah Rahman', type: 'in-store', date: '2024-12-20', time: '2:00 PM', status: 'Confirmed' },
    { id: 2, customer: 'Ahmad Faizal', type: 'virtual', date: '2024-12-18', time: '11:00 AM', status: 'Pending' },
    { id: 3, customer: 'Priya Kumar', type: 'in-store', date: '2024-12-15', time: '3:00 PM', status: 'Completed' },
]

export default function Bookings() {
    return (
        <div className="admin-bookings">
            <div className="admin-page-header">
                <h1>Bookings</h1>
            </div>

            <div className="admin-section">
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Type</th>
                                <th>Date & Time</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingsData.map((booking) => (
                                <tr key={booking.id}>
                                    <td><strong>{booking.customer}</strong></td>
                                    <td>
                                        <span className="booking-type">
                                            {booking.type === 'in-store' ? <MapPin size={16} /> : <Video size={16} />}
                                            {booking.type === 'in-store' ? 'In-Store' : 'Virtual'}
                                        </span>
                                    </td>
                                    <td>
                                        <div>{new Date(booking.date).toLocaleDateString('en-MY', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                                        <div className="text-muted">{booking.time}</div>
                                    </td>
                                    <td>
                                        <span className={`status-badge status-badge--${booking.status.toLowerCase()}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td>
                                        {booking.status === 'Pending' && (
                                            <div className="table-actions">
                                                <button className="table-action-btn table-action-btn--success" title="Confirm">
                                                    <Check size={16} />
                                                </button>
                                                <button className="table-action-btn table-action-btn--danger" title="Cancel">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{`
        .booking-type {
          display: flex;
          align-items: center;
          gap: var(--space-2);
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

        .table-action-btn--success:hover {
          background: rgba(34, 197, 94, 0.1);
          color: var(--color-success);
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

        .status-badge--confirmed { background: rgba(34, 197, 94, 0.1); color: var(--color-success); }
        .status-badge--pending { background: rgba(245, 158, 11, 0.1); color: var(--color-warning); }
        .status-badge--completed { background: var(--color-accent); color: var(--color-text-secondary); }
      `}</style>
        </div>
    )
}
