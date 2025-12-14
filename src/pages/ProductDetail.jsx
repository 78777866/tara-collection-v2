import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Check, ChevronRight, ChevronLeft, ShoppingBag, Heart, Share2, Ruler, Palette } from 'lucide-react'
import './ProductDetail.css'

// Demo product data
const demoProduct = {
    id: 1,
    name: 'Elegant Baju Kurung Modern',
    category: 'Baju Kurung',
    base_price: 350,
    express_surcharge: 100,
    express_available: true,
    description: 'A modern interpretation of the classic Baju Kurung, featuring clean lines and contemporary tailoring while maintaining traditional elegance. Perfect for both formal occasions and everyday wear.',
    images: [
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop'
    ],
    fabrics: [
        { id: 1, name: 'Cotton Lawn', price: 0, color: '#E8DCC4' },
        { id: 2, name: 'Silk Blend', price: 150, color: '#C5A059' },
        { id: 3, name: 'Premium Songket', price: 350, color: '#0A3200' },
        { id: 4, name: 'Chiffon', price: 100, color: '#F5F0E6' }
    ],
    styles: [
        { id: 1, name: 'Classic', description: 'Traditional cut with straight lines' },
        { id: 2, name: 'Modern Slim', description: 'Contemporary fitted silhouette' },
        { id: 3, name: 'A-Line', description: 'Flared bottom for elegant flow' }
    ]
}

const steps = [
    { id: 1, name: 'Fabric', icon: Palette },
    { id: 2, name: 'Style', icon: Ruler },
    { id: 3, name: 'Measurements', icon: Ruler },
    { id: 4, name: 'Review', icon: Check }
]

export default function ProductDetail() {
    const { id } = useParams()
    const [currentStep, setCurrentStep] = useState(1)
    const [currentImage, setCurrentImage] = useState(0)
    const [selectedFabric, setSelectedFabric] = useState(null)
    const [selectedStyle, setSelectedStyle] = useState(null)
    const [expressDelivery, setExpressDelivery] = useState(false)
    const [measurements, setMeasurements] = useState({
        bust: '',
        waist: '',
        hip: '',
        length: '',
        sleeve: ''
    })

    const product = demoProduct // In real app, fetch by id

    const calculateTotal = () => {
        let total = product.base_price
        if (selectedFabric) total += selectedFabric.price
        if (expressDelivery) total += product.express_surcharge
        return total
    }

    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1)
    }

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const handleMeasurementChange = (field, value) => {
        setMeasurements(prev => ({ ...prev, [field]: value }))
    }

    const canProceed = () => {
        if (currentStep === 1) return selectedFabric !== null
        if (currentStep === 2) return selectedStyle !== null
        if (currentStep === 3) return Object.values(measurements).every(v => v !== '')
        return true
    }

    return (
        <div className="product-detail">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/products">Collections</Link>
                    <ChevronRight size={16} />
                    <Link to={`/products?category=${product.category.toLowerCase().replace(' ', '-')}`}>
                        {product.category}
                    </Link>
                    <ChevronRight size={16} />
                    <span>{product.name}</span>
                </nav>

                <div className="product-detail__layout">
                    {/* Image Gallery */}
                    <div className="product-gallery">
                        <motion.div
                            className="product-gallery__main"
                            key={currentImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img src={product.images[currentImage]} alt={product.name} />
                            {product.express_available && (
                                <span className="product-gallery__badge badge badge-express">
                                    <Clock size={14} />
                                    48hr Express Available
                                </span>
                            )}
                        </motion.div>
                        <div className="product-gallery__thumbs">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    className={`product-gallery__thumb ${currentImage === index ? 'product-gallery__thumb--active' : ''}`}
                                    onClick={() => setCurrentImage(index)}
                                >
                                    <img src={img} alt={`View ${index + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Customizer */}
                    <div className="product-customizer">
                        <div className="product-customizer__header">
                            <span className="product-customizer__category">{product.category}</span>
                            <h1 className="product-customizer__title">{product.name}</h1>
                            <p className="product-customizer__description">{product.description}</p>

                            <div className="product-customizer__actions">
                                <button className="action-btn">
                                    <Heart size={20} />
                                </button>
                                <button className="action-btn">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Progress Steps */}
                        <div className="customizer-steps">
                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className={`customizer-step ${currentStep >= step.id ? 'customizer-step--active' : ''} ${currentStep === step.id ? 'customizer-step--current' : ''}`}
                                >
                                    <div className="customizer-step__icon">
                                        {currentStep > step.id ? <Check size={16} /> : step.id}
                                    </div>
                                    <span className="customizer-step__name">{step.name}</span>
                                    {index < steps.length - 1 && <div className="customizer-step__line" />}
                                </div>
                            ))}
                        </div>

                        {/* Step Content */}
                        <div className="customizer-content">
                            {currentStep === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="customizer-section"
                                >
                                    <h3>Select Your Fabric</h3>
                                    <p>Choose from our premium fabric collection</p>
                                    <div className="fabric-grid">
                                        {product.fabrics.map(fabric => (
                                            <button
                                                key={fabric.id}
                                                className={`fabric-option ${selectedFabric?.id === fabric.id ? 'fabric-option--selected' : ''}`}
                                                onClick={() => setSelectedFabric(fabric)}
                                            >
                                                <div
                                                    className="fabric-option__swatch"
                                                    style={{ backgroundColor: fabric.color }}
                                                />
                                                <div className="fabric-option__info">
                                                    <span className="fabric-option__name">{fabric.name}</span>
                                                    <span className="fabric-option__price">
                                                        {fabric.price > 0 ? `+RM ${fabric.price}` : 'Included'}
                                                    </span>
                                                </div>
                                                {selectedFabric?.id === fabric.id && (
                                                    <Check className="fabric-option__check" size={18} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="customizer-section"
                                >
                                    <h3>Choose Your Style</h3>
                                    <p>Select the cut that suits you best</p>
                                    <div className="style-grid">
                                        {product.styles.map(style => (
                                            <button
                                                key={style.id}
                                                className={`style-option ${selectedStyle?.id === style.id ? 'style-option--selected' : ''}`}
                                                onClick={() => setSelectedStyle(style)}
                                            >
                                                <div className="style-option__content">
                                                    <h4>{style.name}</h4>
                                                    <p>{style.description}</p>
                                                </div>
                                                {selectedStyle?.id === style.id && (
                                                    <Check className="style-option__check" size={18} />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="customizer-section"
                                >
                                    <h3>Your Measurements</h3>
                                    <p>Enter your measurements in centimeters</p>
                                    <div className="measurements-form">
                                        {Object.entries(measurements).map(([key, value]) => (
                                            <div key={key} className="measurement-field">
                                                <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                                <div className="measurement-input">
                                                    <input
                                                        type="number"
                                                        id={key}
                                                        value={value}
                                                        onChange={(e) => handleMeasurementChange(key, e.target.value)}
                                                        placeholder="cm"
                                                        className="input"
                                                    />
                                                    <span className="measurement-unit">cm</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Link to="/booking" className="measurement-help">
                                        Need help? Book a virtual fitting consultation
                                    </Link>
                                </motion.div>
                            )}

                            {currentStep === 4 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="customizer-section"
                                >
                                    <h3>Review Your Order</h3>
                                    <div className="order-summary">
                                        <div className="summary-item">
                                            <span>Base Price</span>
                                            <span>RM {product.base_price}</span>
                                        </div>
                                        {selectedFabric && (
                                            <div className="summary-item">
                                                <span>Fabric: {selectedFabric.name}</span>
                                                <span>{selectedFabric.price > 0 ? `+RM ${selectedFabric.price}` : 'Included'}</span>
                                            </div>
                                        )}
                                        {selectedStyle && (
                                            <div className="summary-item">
                                                <span>Style: {selectedStyle.name}</span>
                                                <span>Included</span>
                                            </div>
                                        )}

                                        {product.express_available && (
                                            <div className="express-option">
                                                <label className="express-toggle">
                                                    <input
                                                        type="checkbox"
                                                        checked={expressDelivery}
                                                        onChange={(e) => setExpressDelivery(e.target.checked)}
                                                    />
                                                    <span className="express-toggle__slider" />
                                                    <div className="express-toggle__content">
                                                        <span className="express-toggle__title">
                                                            <Clock size={16} />
                                                            48-Hour Express
                                                        </span>
                                                        <span className="express-toggle__price">+RM {product.express_surcharge}</span>
                                                    </div>
                                                </label>
                                            </div>
                                        )}

                                        <div className="summary-total">
                                            <span>Total</span>
                                            <span>RM {calculateTotal().toLocaleString()}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Navigation */}
                        <div className="customizer-nav">
                            <button
                                className="btn btn-ghost"
                                onClick={handleBack}
                                disabled={currentStep === 1}
                            >
                                <ChevronLeft size={18} />
                                Back
                            </button>

                            {currentStep < 4 ? (
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleNext}
                                    disabled={!canProceed()}
                                >
                                    Continue
                                    <ChevronRight size={18} />
                                </button>
                            ) : (
                                <button
                                    className="btn btn-secondary btn-lg"
                                    disabled={!canProceed()}
                                >
                                    <ShoppingBag size={18} />
                                    Add to Cart - RM {calculateTotal().toLocaleString()}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
