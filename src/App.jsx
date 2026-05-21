import React from 'react'
import './App.css'
import BillingForm from './components/BillingForm'
import OrderSummary from './components/OrderSummary'
import { useState, useMemo } from 'react'

const INITIAL_FORM = {
  company: 'abhigyan',
  email: 'abhigyan.pandey@getreelax.com',
  gst: '', pan: '', premise: '', street: '',
  state: '', city: '', country: 'India', pincode: '',
}

export default function App() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [walletApplied, setWalletApplied] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState('WELCOME20')
  const [couponInput, setCouponInput] = useState('')
  const [couponError, setCouponError] = useState('')

  const updateField = (key, value) => {
    setForm(prev => {
      const next = { ...prev, [key]: value }
      if (key === 'state') next.city = ''
      return next
    })
  }

  const COUPONS = [
    { code: 'WELCOME20', label: '20% off on your first month' },
    { code: 'ANNUAL50',  label: '50% off on annual plans' },
  ]

  const applyCoupon = () => {
    const match = COUPONS.find(c => c.code === couponInput.trim().toUpperCase())
    if (match) {
      setSelectedCoupon(match.code)
      setCouponInput('')
      setCouponError('')
    } else {
      setCouponError('Invalid coupon code')
    }
  }

  const pricing = useMemo(() => {
    const subtotal = 14999
    const taxRate = 0.18
    const walletBalance = 500
    const walletDiscount = walletApplied ? walletBalance : 0
    const tax = parseFloat(((subtotal - walletDiscount) * taxRate).toFixed(2))
    const total = subtotal - walletDiscount + tax
    return { subtotal, tax, walletDiscount, total, walletBalance }
  }, [walletApplied])

  return (
    <div className="app-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-search">
          <svg width="15" height="15" fill="none" stroke="#9aa0aa" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input type="text" placeholder="Find influencers to collaborate with" />
        </div>
        <div className="navbar-actions">
          <button className="btn-upgrade">⬆ Upgrade</button>
          <button className="btn-create">+ Create Campaign</button>
          <button className="btn-avatar">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
          <button className="btn-menu">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Page */}
      <div className="page">
        <button className="back-btn">← Back to plans</button>
        <div className="layout">
          <BillingForm
            form={form}
            updateField={updateField}
            onCancel={() => alert('Cancelled')}
            onSave={() => alert('Saved!')}
          />
          <aside className="sidebar">
            <OrderSummary
              pricing={pricing}
              walletApplied={walletApplied}
              setWalletApplied={setWalletApplied}
              selectedCoupon={selectedCoupon}
              setSelectedCoupon={setSelectedCoupon}
              couponInput={couponInput}
              setCouponInput={setCouponInput}
              couponError={couponError}
              applyCoupon={applyCoupon}
              onProceed={() => alert('Proceeding to payment!')}
            />
          </aside>
        </div>
      </div>
    </div>
  )
}