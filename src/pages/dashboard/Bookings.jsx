import { Calendar, Clock, MapPin, Video, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const bookingsData = [
    {
        id: 1,
        type: 'in-store',
        date: '2024-12-20',
        time: '2:00 PM',
        status: 'Confirmed'
    },
    {
        id: 2,
        type: 'virtual',
        date: '2024-12-15',
        time: '11:00 AM',
        status: 'Completed'
    }
]

export default function Bookings() {
    return (
        <div className="dashboard-bookings">
            <div className="dashboard-page-header">
                <div>
                    <h1>My Bookings</h1>
                    <p>Manage your fitting appointments</p>
                </div>
                <Link to="/booking" className="btn btn-secondary">
                    Book New Appointment
                </Link>
            </div>

            <div className="bookings-content">
                {bookingsData.length === 0 ? (
                    <div className="empty-state card">
                        <Calendar size={48} />
                        <h3>No Appointments</h3>
                        <p>You don't have any upcoming appointments</p>
                        <Link to="/booking" className="btn btn-secondary">
                            Book a Fitting
                        </Link>
                    </div>
                ) : (
                    <div className="bookings-grid">
                        {bookingsData.map((booking) => (
                            <div key={booking.id} className="booking-card card">
                                <div className="booking-card__header">
                                    <div className="booking-card__type">
                                        {booking.type === 'in-store' ? (
                                            <><MapPin size={18} /> In-Store</>
                                        ) : (
                                            <><Video size={18} /> Virtual</>
                                        )}
                                    </div>
                                    <span className={`status-badge status-badge--${booking.status.toLowerCase()}`}>
                                        {booking.status}
                                    </span>
                                </div>
                                <div className="booking-card__details">
                                    <div className="booking-card__detail">
                                        <Calendar size={16} />
                                        {new Date(booking.date).toLocaleDateString('en-MY', {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    <div className="booking-card__detail">
                                        <Clock size={16} />
                                        {booking.time}
                                    </div>
                                </div>
                                {booking.status !== 'Completed' && (
                                    <div className="booking-card__actions">
                                        <button className="btn btn-ghost btn-sm">Reschedule</button>
                                        <button className="btn btn-ghost btn-sm booking-card__cancel">
                                            <X size={16} /> Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
        .dashboard-page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-8);
        }

        .bookings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: var(--space-5);
        }

        .booking-card {
          padding: var(--space-5);
        }

        .booking-card__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }

        .booking-card__type {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-weight: var(--font-semibold);
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

        .status-badge--confirmed {
          background: rgba(34, 197, 94, 0.1);
          color: var(--color-success);
        }

        .status-badge--completed {
          background: var(--color-accent);
          color: var(--color-text-secondary);
        }

        .booking-card__details {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
        }

        .booking-card__detail {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .booking-card__actions {
          display: flex;
          gap: var(--space-2);
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-accent);
        }

        .booking-card__cancel {
          color: var(--color-error);
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-12);
          text-align: center;
        }

        .empty-state svg {
          color: var(--color-text-muted);
        }

        .empty-state h3 {
          margin: 0;
        }

        @media (max-width: 640px) {
          .dashboard-page-header {
            flex-direction: column;
            gap: var(--space-4);
          }

          .bookings-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    )
}
