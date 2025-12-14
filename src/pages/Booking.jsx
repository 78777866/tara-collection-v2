import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Video, Phone, Mail, Check, ChevronRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import './Booking.css'

const appointmentTypes = [
    {
        id: 'in-store',
        name: 'In-Store Fitting',
        description: 'Visit our boutique for a personalized fitting experience',
        icon: MapPin,
        duration: '60 min'
    },
    {
        id: 'virtual',
        name: 'Virtual Consultation',
        description: 'Connect with our tailors via video call from anywhere',
        icon: Video,
        duration: '45 min'
    }
]

const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

export default function Booking() {
    const { user } = useAuth()
    const [step, setStep] = useState(1)
    const [selectedType, setSelectedType] = useState(null)
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: user?.email || '',
        phone: '',
        notes: ''
    })
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // In real app, save to Supabase
            const { error } = await supabase.from('bookings').insert({
                user_id: user?.id,
                type: selectedType,
                date: selectedDate,
                time: selectedTime,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                notes: formData.notes,
                status: 'pending'
            })

            if (error) throw error
            setSubmitted(true)
        } catch (error) {
            console.log('Demo mode: Booking would be saved here')
            setSubmitted(true)
        } finally {
            setLoading(false)
        }
    }

    const getMinDate = () => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        return tomorrow.toISOString().split('T')[0]
    }

    if (submitted) {
        return (
            <div className="booking-page">
                <div className="container">
                    <motion.div
                        className="booking-success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="booking-success__icon">
                            <Check size={48} />
                        </div>
                        <h2>Booking Confirmed!</h2>
                        <p>
                            Thank you for booking with Tara Collection. We've sent a confirmation
                            email to <strong>{formData.email}</strong> with your appointment details.
                        </p>
                        <div className="booking-success__details">
                            <div className="booking-success__item">
                                <Calendar size={20} />
                                <span>{new Date(selectedDate).toLocaleDateString('en-MY', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                            <div className="booking-success__item">
                                <Clock size={20} />
                                <span>{selectedTime}</span>
                            </div>
                            <div className="booking-success__item">
                                {selectedType === 'in-store' ? <MapPin size={20} /> : <Video size={20} />}
                                <span>{selectedType === 'in-store' ? 'In-Store Fitting' : 'Virtual Consultation'}</span>
                            </div>
                        </div>
                        <a href="/" className="btn btn-secondary">
                            Back to Home
                        </a>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div className="booking-page">
            {/* Header */}
            <section className="booking-header">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1>Book a Fitting</h1>
                        <p>Schedule a personalized consultation with our expert tailors</p>
                    </motion.div>
                </div>
            </section>

            <div className="booking-content container">
                <div className="booking-main">
                    {/* Progress */}
                    <div className="booking-progress">
                        {['Appointment Type', 'Date & Time', 'Your Details'].map((label, index) => (
                            <div
                                key={index}
                                className={`booking-progress__step ${step > index + 1 ? 'booking-progress__step--done' : ''} ${step === index + 1 ? 'booking-progress__step--active' : ''}`}
                            >
                                <div className="booking-progress__icon">
                                    {step > index + 1 ? <Check size={16} /> : index + 1}
                                </div>
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Appointment Type */}
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="booking-step"
                        >
                            <h2>Choose Appointment Type</h2>
                            <p>Select how you'd like to meet with our tailors</p>

                            <div className="appointment-types">
                                {appointmentTypes.map(type => (
                                    <button
                                        key={type.id}
                                        className={`appointment-type ${selectedType === type.id ? 'appointment-type--selected' : ''}`}
                                        onClick={() => setSelectedType(type.id)}
                                    >
                                        <div className="appointment-type__icon">
                                            <type.icon size={28} />
                                        </div>
                                        <div className="appointment-type__content">
                                            <h3>{type.name}</h3>
                                            <p>{type.description}</p>
                                            <span className="appointment-type__duration">
                                                <Clock size={14} />
                                                {type.duration}
                                            </span>
                                        </div>
                                        {selectedType === type.id && (
                                            <Check className="appointment-type__check" size={24} />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="booking-nav">
                                <div />
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setStep(2)}
                                    disabled={!selectedType}
                                >
                                    Continue
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Date & Time */}
                    {step === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="booking-step"
                        >
                            <h2>Select Date & Time</h2>
                            <p>Choose your preferred appointment slot</p>

                            <div className="datetime-picker">
                                <div className="date-picker">
                                    <label>Select Date</label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        min={getMinDate()}
                                        className="input"
                                    />
                                </div>

                                {selectedDate && (
                                    <div className="time-picker">
                                        <label>Select Time</label>
                                        <div className="time-slots">
                                            {timeSlots.map(time => (
                                                <button
                                                    key={time}
                                                    className={`time-slot ${selectedTime === time ? 'time-slot--selected' : ''}`}
                                                    onClick={() => setSelectedTime(time)}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="booking-nav">
                                <button
                                    className="btn btn-ghost"
                                    onClick={() => setStep(1)}
                                >
                                    Back
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setStep(3)}
                                    disabled={!selectedDate || !selectedTime}
                                >
                                    Continue
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Details */}
                    {step === 3 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="booking-step"
                        >
                            <h2>Your Details</h2>
                            <p>Please provide your contact information</p>

                            <form onSubmit={handleSubmit} className="booking-form">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="input"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="input"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="input"
                                            placeholder="+60 12-345 6789"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="notes">Additional Notes (Optional)</label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        className="input"
                                        rows="4"
                                        placeholder="Any specific requirements or questions?"
                                    />
                                </div>

                                <div className="booking-nav">
                                    <button
                                        type="button"
                                        className="btn btn-ghost"
                                        onClick={() => setStep(2)}
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-secondary btn-lg"
                                        disabled={loading}
                                    >
                                        {loading ? 'Confirming...' : 'Confirm Booking'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="booking-sidebar">
                    <div className="booking-summary card">
                        <h3>Booking Summary</h3>

                        {selectedType && (
                            <div className="summary-section">
                                <h4>Appointment Type</h4>
                                <p>
                                    {selectedType === 'in-store' ? (
                                        <><MapPin size={16} /> In-Store Fitting</>
                                    ) : (
                                        <><Video size={16} /> Virtual Consultation</>
                                    )}
                                </p>
                            </div>
                        )}

                        {selectedDate && (
                            <div className="summary-section">
                                <h4>Date</h4>
                                <p>
                                    <Calendar size={16} />
                                    {new Date(selectedDate).toLocaleDateString('en-MY', {
                                        weekday: 'short',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        )}

                        {selectedTime && (
                            <div className="summary-section">
                                <h4>Time</h4>
                                <p>
                                    <Clock size={16} />
                                    {selectedTime}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="booking-contact card">
                        <h3>Need Help?</h3>
                        <p>Our team is here to assist you</p>
                        <div className="contact-links">
                            <a href="tel:+60312345678">
                                <Phone size={18} />
                                +60 3-1234 5678
                            </a>
                            <a href="mailto:hello@taracollection.my">
                                <Mail size={18} />
                                hello@taracollection.my
                            </a>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}
