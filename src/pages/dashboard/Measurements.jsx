import { useState } from 'react'
import { Save, Info } from 'lucide-react'

const measurementFields = [
    { key: 'bust', label: 'Bust', description: 'Measure around the fullest part of your bust' },
    { key: 'waist', label: 'Waist', description: 'Measure around your natural waistline' },
    { key: 'hip', label: 'Hip', description: 'Measure around the fullest part of your hips' },
    { key: 'shoulder', label: 'Shoulder Width', description: 'Measure from shoulder point to shoulder point' },
    { key: 'armLength', label: 'Arm Length', description: 'Measure from shoulder to wrist' },
    { key: 'inseam', label: 'Inseam', description: 'Measure from crotch to ankle' },
]

export default function Measurements() {
    const [measurements, setMeasurements] = useState({
        bust: '92',
        waist: '76',
        hip: '96',
        shoulder: '42',
        armLength: '58',
        inseam: '76',
    })
    const [saved, setSaved] = useState(false)

    const handleChange = (key, value) => {
        setMeasurements(prev => ({ ...prev, [key]: value }))
        setSaved(false)
    }

    const handleSave = () => {
        // In real app, save to Supabase
        console.log('Saving measurements:', measurements)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    return (
        <div className="dashboard-measurements">
            <div className="dashboard-page-header">
                <h1>My Measurements</h1>
                <p>Keep your measurements updated for perfect fitting</p>
            </div>

            <div className="measurements-content">
                <div className="dashboard-section">
                    <div className="measurements-grid">
                        {measurementFields.map((field) => (
                            <div key={field.key} className="measurement-field">
                                <label htmlFor={field.key}>
                                    {field.label}
                                    <span className="measurement-tooltip" title={field.description}>
                                        <Info size={14} />
                                    </span>
                                </label>
                                <div className="measurement-input">
                                    <input
                                        type="number"
                                        id={field.key}
                                        value={measurements[field.key]}
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                        className="input"
                                    />
                                    <span className="measurement-unit">cm</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="measurements-actions">
                        <button className="btn btn-secondary" onClick={handleSave}>
                            <Save size={18} />
                            {saved ? 'Saved!' : 'Save Measurements'}
                        </button>
                    </div>
                </div>

                <div className="measurements-guide card">
                    <h3>Measurement Guide</h3>
                    <p>For the most accurate fit, we recommend:</p>
                    <ul>
                        <li>Use a soft measuring tape</li>
                        <li>Measure over light clothing</li>
                        <li>Stand straight with arms relaxed</li>
                        <li>Have someone help you measure</li>
                    </ul>
                    <p>
                        Need help? <a href="/booking">Book a virtual fitting</a> with our experts.
                    </p>
                </div>
            </div>

            <style>{`
        .measurements-content {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: var(--space-6);
          align-items: start;
        }

        .dashboard-section {
          background: var(--color-surface);
          padding: var(--space-6);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
        }

        .measurements-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-5);
          margin-bottom: var(--space-6);
        }

        .measurement-field label {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-weight: var(--font-medium);
          margin-bottom: var(--space-2);
        }

        .measurement-tooltip {
          color: var(--color-text-muted);
          cursor: help;
        }

        .measurement-input {
          position: relative;
        }

        .measurement-input .input {
          padding-right: var(--space-10);
        }

        .measurement-unit {
          position: absolute;
          right: var(--space-3);
          top: 50%;
          transform: translateY(-50%);
          font-size: var(--text-sm);
          color: var(--color-text-muted);
        }

        .measurements-actions {
          display: flex;
          justify-content: flex-end;
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-accent);
        }

        .measurements-guide {
          padding: var(--space-6);
        }

        .measurements-guide h3 {
          font-size: var(--text-lg);
          margin-bottom: var(--space-3);
        }

        .measurements-guide ul {
          margin: var(--space-4) 0;
          padding-left: var(--space-5);
        }

        .measurements-guide li {
          margin-bottom: var(--space-2);
          color: var(--color-text-secondary);
        }

        .measurements-guide a {
          color: var(--color-secondary);
        }

        @media (max-width: 900px) {
          .measurements-content {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .measurements-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    )
}
