import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react'

const productsData = [
    { id: 1, name: 'Elegant Baju Kurung Modern', category: 'Baju Kurung', price: 350, status: 'Live', stock: 'Made to Order' },
    { id: 2, name: 'Classic Baju Melayu Johor', category: 'Baju Melayu', price: 420, status: 'Live', stock: 'Made to Order' },
    { id: 3, name: 'Silk Banarasi Saree', category: 'Saree', price: 890, status: 'Live', stock: 'Made to Order' },
    { id: 4, name: 'Premium Songket Set', category: 'Baju Kurung', price: 1100, status: 'Draft', stock: 'Made to Order' },
]

export default function Products() {
    const [products] = useState(productsData)
    const [searchQuery, setSearchQuery] = useState('')

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="admin-products">
            <div className="admin-page-header">
                <h1>Products</h1>
                <button className="btn btn-secondary">
                    <Plus size={18} />
                    Add Product
                </button>
            </div>

            <div className="admin-section">
                <div className="admin-toolbar">
                    <div className="admin-search">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input"
                        />
                    </div>
                    <button className="btn btn-ghost btn-sm">
                        <Filter size={16} />
                        Filter
                    </button>
                </div>

                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td><strong>{product.name}</strong></td>
                                    <td>{product.category}</td>
                                    <td>RM {product.price}</td>
                                    <td>
                                        <span className={`status-badge status-badge--${product.status.toLowerCase()}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="table-action-btn" title="View"><Eye size={16} /></button>
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
        .admin-toolbar {
          display: flex;
          gap: var(--space-4);
          margin-bottom: var(--space-5);
        }

        .admin-search {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
        }

        .admin-search svg {
          position: absolute;
          left: var(--space-3);
          color: var(--color-text-muted);
        }

        .admin-search .input {
          padding-left: var(--space-10);
          max-width: 400px;
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

        .status-badge--live {
          background: rgba(34, 197, 94, 0.1);
          color: var(--color-success);
        }

        .status-badge--draft {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }
      `}</style>
        </div>
    )
}
