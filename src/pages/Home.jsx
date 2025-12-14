import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Scissors, Users, Sparkles, Star, Award, Truck, ArrowRight } from 'lucide-react'
import './Home.css'

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
}

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

const services = [
    {
        icon: Clock,
        title: '48-Hour Express',
        description: 'Rush orders completed within 2 days without compromising on quality.'
    },
    {
        icon: Scissors,
        title: 'Custom Tailoring',
        description: 'Every garment crafted to your exact measurements and style preferences.'
    },
    {
        icon: Users,
        title: 'Virtual Consultation',
        description: 'Book online video sessions with our expert tailors from anywhere.'
    },
    {
        icon: Sparkles,
        title: 'Premium Fabrics',
        description: 'Hand-selected materials sourced from the finest textile houses.'
    }
]

const stats = [
    { value: '20+', label: 'Master Tailors' },
    { value: '5000+', label: 'Happy Customers' },
    { value: '48hrs', label: 'Express Delivery' },
    { value: '15+', label: 'Years Experience' }
]

const categories = [
    {
        name: 'Baju Kurung',
        description: 'Traditional elegance for every occasion',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop',
        link: '/products?category=baju-kurung'
    },
    {
        name: 'Baju Melayu',
        description: 'Timeless sophistication for men',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
        link: '/products?category=baju-melayu'
    },
    {
        name: 'Saree & Lehenga',
        description: 'Exquisite South Asian craftsmanship',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop',
        link: '/products?category=saree'
    }
]

const testimonials = [
    {
        name: 'Aisyah Rahman',
        role: 'Bride, KL',
        content: 'Tara Collection made my wedding attire dreams come true. The attention to detail was extraordinary!',
        rating: 5
    },
    {
        name: 'Ahmad Faizal',
        role: 'Corporate Executive',
        content: 'Their 48-hour express service saved me for an important event. Impeccable quality and fit.',
        rating: 5
    },
    {
        name: 'Priya Sundaram',
        role: 'Fashion Enthusiast',
        content: 'The virtual consultation was so convenient. My saree arrived perfectly tailored to my measurements.',
        rating: 5
    }
]

export default function Home() {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero__background">
                    <div className="hero__overlay" />
                </div>
                <div className="hero__content container">
                    <motion.div
                        className="hero__text"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="hero__badge">
                            <Sparkles size={16} />
                            Established 2024 • Kuala Lumpur
                        </span>
                        <h1 className="hero__title">
                            Artisan Tailoring,
                            <span className="text-gradient-gold"> Delivered in 48 Hours</span>
                        </h1>
                        <p className="hero__subtitle">
                            Experience the perfect blend of traditional craftsmanship and modern convenience.
                            Custom Baju Kurung, Baju Melayu, and South Asian attire tailored to perfection.
                        </p>
                        <div className="hero__ctas">
                            <Link to="/products" className="btn btn-secondary btn-lg">
                                Explore Collections
                                <ArrowRight size={20} />
                            </Link>
                            <Link to="/booking" className="btn btn-ghost btn-lg hero__cta-ghost">
                                Book a Fitting
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Stats */}
                <motion.div
                    className="hero__stats glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="hero__stat">
                            <span className="hero__stat-value">{stat.value}</span>
                            <span className="hero__stat-label">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </section>

            {/* Services Section */}
            <section className="services">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Our Services</h2>
                        <p>Tailored excellence, from consultation to creation</p>
                    </motion.div>

                    <motion.div
                        className="services__grid"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="service-card card"
                                variants={fadeInUp}
                            >
                                <div className="service-card__icon">
                                    <service.icon size={28} />
                                </div>
                                <h3 className="service-card__title">{service.title}</h3>
                                <p className="service-card__description">{service.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Our Collections</h2>
                        <p>Discover our curated selection of traditional attire</p>
                    </motion.div>

                    <motion.div
                        className="categories__grid"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {categories.map((category, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                            >
                                <Link to={category.link} className="category-card">
                                    <div className="category-card__image">
                                        <img src={category.image} alt={category.name} />
                                        <div className="category-card__overlay" />
                                    </div>
                                    <div className="category-card__content">
                                        <h3 className="category-card__title">{category.name}</h3>
                                        <p className="category-card__description">{category.description}</p>
                                        <span className="category-card__link">
                                            Shop Now <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="trust">
                <div className="container">
                    <div className="trust__grid">
                        <motion.div
                            className="trust__item"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Award className="trust__icon" size={32} />
                            <div>
                                <h4>Quality Guaranteed</h4>
                                <p>Free alterations if not perfectly satisfied</p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="trust__item"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <Truck className="trust__icon" size={32} />
                            <div>
                                <h4>Express Delivery</h4>
                                <p>48-hour turnaround available</p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="trust__item"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Users className="trust__icon" size={32} />
                            <div>
                                <h4>Expert Tailors</h4>
                                <p>20+ master craftsmen at your service</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>What Our Customers Say</h2>
                        <p>Join thousands of satisfied customers</p>
                    </motion.div>

                    <motion.div
                        className="testimonials__grid"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="testimonial-card card"
                                variants={fadeInUp}
                            >
                                <div className="testimonial-card__rating">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={16} fill="currentColor" />
                                    ))}
                                </div>
                                <p className="testimonial-card__content">"{testimonial.content}"</p>
                                <div className="testimonial-card__author">
                                    <div className="testimonial-card__avatar">
                                        {testimonial.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="testimonial-card__name">{testimonial.name}</h4>
                                        <span className="testimonial-card__role">{testimonial.role}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <motion.div
                        className="cta__content"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Ready to Create Your Perfect Outfit?</h2>
                        <p>
                            Book a consultation today and let our master tailors bring your vision to life.
                            Virtual or in-store appointments available.
                        </p>
                        <div className="cta__buttons">
                            <Link to="/booking" className="btn btn-secondary btn-lg">
                                Book Free Consultation
                            </Link>
                            <Link to="/products" className="btn btn-ghost btn-lg cta__btn-ghost">
                                Browse Collections
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
