import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Filter, Grid, List, Search, X, Clock, ChevronDown } from 'lucide-react'
import { supabase } from '../lib/supabase'
import './Products.css'

const categories = [
    { id: 'all', name: 'All Collections' },
    { id: 'baju-kurung', name: 'Baju Kurung' },
    { id: 'baju-melayu', name: 'Baju Melayu' },
    { id: 'saree', name: 'Saree' },
    { id: 'lehenga', name: 'Lehenga' },
    { id: 'kebaya', name: 'Kebaya' }
]

const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '0-200', name: 'Under RM 200' },
    { id: '200-500', name: 'RM 200 - RM 500' },
    { id: '500-1000', name: 'RM 500 - RM 1000' },
    { id: '1000+', name: 'Above RM 1000' }
]

// Demo products for initial display
const demoProducts = [
    {
        id: 1,
        name: 'Elegant Baju Kurung Modern',
        category: 'baju-kurung',
        base_price: 350,
        express_available: true,
        image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop',
        description: 'Modern interpretation of traditional elegance'
    },
    {
        id: 2,
        name: 'Classic Baju Melayu Johor',
        category: 'baju-melayu',
        base_price: 420,
        express_available: true,
        image_url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
        description: 'Timeless Johor-style craftsmanship'
    },
    {
        id: 3,
        name: 'Silk Banarasi Saree',
        category: 'saree',
        base_price: 890,
        express_available: false,
        image_url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop',
        description: 'Hand-woven silk with intricate patterns'
    },
    {
        id: 4,
        name: 'Bridal Lehenga Set',
        category: 'lehenga',
        base_price: 1500,
        express_available: false,
        image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
        description: 'Stunning bridal ensemble with embroidery'
    },
    {
        id: 5,
        name: 'Nyonya Kebaya Lace',
        category: 'kebaya',
        base_price: 480,
        express_available: true,
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop',
        description: 'Delicate Peranakan-inspired lace work'
    },
    {
        id: 6,
        name: 'Premium Songket Kurung',
        category: 'baju-kurung',
        base_price: 750,
        express_available: true,
        image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&h=800&fit=crop',
        description: 'Luxurious songket fabric with gold threads'
    }
]

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [products, setProducts] = useState(demoProducts)
    const [loading, setLoading] = useState(false)
    const [viewMode, setViewMode] = useState('grid')
    const [showFilters, setShowFilters] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const selectedCategory = searchParams.get('category') || 'all'
    const selectedPrice = searchParams.get('price') || 'all'

    useEffect(() => {
        fetchProducts()
    }, [selectedCategory, selectedPrice])

    const fetchProducts = async () => {
        setLoading(true)
        try {
            // Try to fetch from Supabase
            let query = supabase
                .from('products')
                .select('*, product_images(*)')
                .eq('status', 'live')

            if (selectedCategory !== 'all') {
                query = query.eq('category', selectedCategory)
            }

            const { data, error } = await query

            if (error) {
                console.log('Using demo products:', error.message)
                // Filter demo products
                let filtered = demoProducts
                if (selectedCategory !== 'all') {
                    filtered = filtered.filter(p => p.category === selectedCategory)
                }
                setProducts(filtered)
            } else if (data && data.length > 0) {
                setProducts(data)
            } else {
                // No data in DB, use demo products
                let filtered = demoProducts
                if (selectedCategory !== 'all') {
                    filtered = filtered.filter(p => p.category === selectedCategory)
                }
                setProducts(filtered)
            }
        } catch (error) {
            console.error('Error fetching products:', error)
            setProducts(demoProducts)
        } finally {
            setLoading(false)
        }
    }

    const handleCategoryChange = (categoryId) => {
        const newParams = new URLSearchParams(searchParams)
        if (categoryId === 'all') {
            newParams.delete('category')
        } else {
            newParams.set('category', categoryId)
        }
        setSearchParams(newParams)
    }

    const handlePriceChange = (priceId) => {
        const newParams = new URLSearchParams(searchParams)
        if (priceId === 'all') {
            newParams.delete('price')
        } else {
            newParams.set('price', priceId)
        }
        setSearchParams(newParams)
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="products-page">
            {/* Page Header */}
            <section className="products-header">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1>Our Collections</h1>
                        <p>Discover bespoke traditional attire crafted with precision and passion</p>
                    </motion.div>
                </div>
            </section>

            <div className="products-content container">
                {/* Filters Sidebar */}
                <aside className={`products-filters ${showFilters ? 'products-filters--open' : ''}`}>
                    <div className="products-filters__header">
                        <h3>Filters</h3>
                        <button
                            className="products-filters__close"
                            onClick={() => setShowFilters(false)}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Categories */}
                    <div className="filter-group">
                        <h4 className="filter-group__title">Category</h4>
                        <div className="filter-group__options">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`filter-option ${selectedCategory === cat.id ? 'filter-option--active' : ''}`}
                                    onClick={() => handleCategoryChange(cat.id)}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="filter-group">
                        <h4 className="filter-group__title">Price Range</h4>
                        <div className="filter-group__options">
                            {priceRanges.map(range => (
                                <button
                                    key={range.id}
                                    className={`filter-option ${selectedPrice === range.id ? 'filter-option--active' : ''}`}
                                    onClick={() => handlePriceChange(range.id)}
                                >
                                    {range.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Products Grid */}
                <main className="products-main">
                    {/* Toolbar */}
                    <div className="products-toolbar">
                        <button
                            className="products-toolbar__filter-btn btn btn-ghost btn-sm"
                            onClick={() => setShowFilters(true)}
                        >
                            <Filter size={18} />
                            Filters
                        </button>

                        <div className="products-toolbar__search">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input"
                            />
                        </div>

                        <div className="products-toolbar__view">
                            <button
                                className={`view-btn ${viewMode === 'grid' ? 'view-btn--active' : ''}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                className={`view-btn ${viewMode === 'list' ? 'view-btn--active' : ''}`}
                                onClick={() => setViewMode('list')}
                            >
                                <List size={18} />
                            </button>
                        </div>

                        <span className="products-toolbar__count">
                            {filteredProducts.length} products
                        </span>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="products-grid">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="product-card product-card--skeleton">
                                    <div className="product-card__image skeleton" />
                                    <div className="product-card__content">
                                        <div className="skeleton" style={{ height: 24, width: '80%', marginBottom: 8 }} />
                                        <div className="skeleton" style={{ height: 16, width: '60%' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            className={`products-grid ${viewMode === 'list' ? 'products-grid--list' : ''}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            {filteredProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link to={`/products/${product.id}`} className="product-card card">
                                        <div className="product-card__image-wrapper">
                                            <img
                                                src={product.image_url || product.product_images?.[0]?.url}
                                                alt={product.name}
                                                className="product-card__image"
                                            />
                                            {product.express_available && (
                                                <span className="product-card__badge badge badge-express">
                                                    <Clock size={12} />
                                                    48hr Express
                                                </span>
                                            )}
                                        </div>
                                        <div className="product-card__content">
                                            <span className="product-card__category">
                                                {categories.find(c => c.id === product.category)?.name || product.category}
                                            </span>
                                            <h3 className="product-card__name">{product.name}</h3>
                                            <p className="product-card__description">{product.description}</p>
                                            <div className="product-card__footer">
                                                <span className="product-card__price">
                                                    RM {product.base_price?.toLocaleString()}
                                                </span>
                                                <span className="product-card__cta">
                                                    Customize <ChevronDown size={16} style={{ transform: 'rotate(-90deg)' }} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* Empty State */}
                    {!loading && filteredProducts.length === 0 && (
                        <div className="products-empty">
                            <h3>No products found</h3>
                            <p>Try adjusting your filters or search query</p>
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    setSearchQuery('')
                                    setSearchParams({})
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
