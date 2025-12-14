import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Public Pages
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Booking from './pages/Booking'
import Auth from './pages/Auth'

// Customer Dashboard
import DashboardLayout from './pages/dashboard/DashboardLayout'
import DashboardOverview from './pages/dashboard/Overview'
import DashboardOrders from './pages/dashboard/Orders'
import DashboardMeasurements from './pages/dashboard/Measurements'
import DashboardBookings from './pages/dashboard/Bookings'
import DashboardProfile from './pages/dashboard/Profile'

// Admin Panel
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import AdminDiscounts from './pages/admin/Discounts'
import AdminOrders from './pages/admin/Orders'
import AdminBookings from './pages/admin/Bookings'
import AdminUsers from './pages/admin/Users'

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <>
              <Navbar />
              <main><Home /></main>
              <Footer />
            </>
          } />
          <Route path="/products" element={
            <>
              <Navbar />
              <main><Products /></main>
              <Footer />
            </>
          } />
          <Route path="/products/:id" element={
            <>
              <Navbar />
              <main><ProductDetail /></main>
              <Footer />
            </>
          } />
          <Route path="/booking" element={
            <>
              <Navbar />
              <main><Booking /></main>
              <Footer />
            </>
          } />
          <Route path="/auth" element={
            <>
              <Navbar />
              <main><Auth /></main>
              <Footer />
            </>
          } />

          {/* Customer Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="orders" element={<DashboardOrders />} />
            <Route path="measurements" element={<DashboardMeasurements />} />
            <Route path="bookings" element={<DashboardBookings />} />
            <Route path="profile" element={<DashboardProfile />} />
          </Route>

          {/* Admin Panel Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="discounts" element={<AdminDiscounts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
