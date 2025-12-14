import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Instagram, Facebook, Clock } from 'lucide-react'
import './Footer.css'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer__container container">
                {/* Brand Section */}
                <div className="footer__brand">
                    <Link to="/" className="footer__logo">
                        <span className="footer__logo-text">Tara</span>
                        <span className="footer__logo-accent">Collection</span>
                    </Link>
                    <p className="footer__tagline">
                        Premium bespoke tailoring for traditional Malaysian and South Asian attire.
                        Experience the art of 48-hour express custom tailoring.
                    </p>
                    <div className="footer__social">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                            <Instagram size={20} />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
                            <Facebook size={20} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer__section">
                    <h4 className="footer__heading">Quick Links</h4>
                    <nav className="footer__nav">
                        <Link to="/products" className="footer__link">Collections</Link>
                        <Link to="/products?category=baju-kurung" className="footer__link">Baju Kurung</Link>
                        <Link to="/products?category=baju-melayu" className="footer__link">Baju Melayu</Link>
                        <Link to="/products?category=saree" className="footer__link">Saree</Link>
                        <Link to="/booking" className="footer__link">Book Fitting</Link>
                    </nav>
                </div>

                {/* Services */}
                <div className="footer__section">
                    <h4 className="footer__heading">Services</h4>
                    <nav className="footer__nav">
                        <Link to="/booking" className="footer__link">Virtual Consultation</Link>
                        <Link to="/booking" className="footer__link">In-Store Fitting</Link>
                        <span className="footer__link footer__link--badge">
                            48-Hour Express
                            <span className="badge badge-express">New</span>
                        </span>
                        <Link to="/products" className="footer__link">Custom Tailoring</Link>
                    </nav>
                </div>

                {/* Contact */}
                <div className="footer__section">
                    <h4 className="footer__heading">Contact Us</h4>
                    <div className="footer__contact">
                        <div className="footer__contact-item">
                            <MapPin size={18} />
                            <span>123 Jalan Bukit Bintang,<br />Kuala Lumpur, Malaysia</span>
                        </div>
                        <a href="tel:+60312345678" className="footer__contact-item">
                            <Phone size={18} />
                            <span>+60 3-1234 5678</span>
                        </a>
                        <a href="mailto:hello@taracollection.my" className="footer__contact-item">
                            <Mail size={18} />
                            <span>hello@taracollection.my</span>
                        </a>
                        <div className="footer__contact-item">
                            <Clock size={18} />
                            <span>Mon - Sat: 10am - 8pm<br />Sun: 12pm - 6pm</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer__bottom">
                <div className="container footer__bottom-container">
                    <p className="footer__copyright">
                        © {currentYear} Tara Collection. All rights reserved.
                    </p>
                    <div className="footer__legal">
                        <Link to="/privacy" className="footer__legal-link">Privacy Policy</Link>
                        <Link to="/terms" className="footer__legal-link">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
