import React, { useState } from 'react'
import './OrderSummary.css'

const COUPONS = [
  { code: 'WELCOME20', label: '20% off on your first month' },
  { code: 'ANNUAL50',  label: '50% off on annual plans' },
]

const fmt = n => n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default function OrderSummary({
  pricing,
  walletApplied, setWalletApplied,
  selectedCoupon, setSelectedCoupon,
  couponInput, setCouponInput,
  couponError, applyCoupon,
  onProceed,
}) {
  const [couponOpen, setCouponOpen] = useState(true)
  const { subtotal, tax, walletDiscount, total, walletBalance } = pricing

  return (
    <>
      {/* Plan Card */}
      <div className="os-card">
        <h2 className="os-heading">Order Summary</h2>
        <div className="plan-box">
          <div className="plan-price-group">
            <span className="plan-price">₹4,999</span>
            <span className="plan-period">/month</span>
            <p className="plan-credits">Includes 5,000 credits/mo.</p>
          </div>
          <div className="plan-label">
            <span className="selected-tag">SELECTED PLAN</span>
            <span className="plan-name">Startup</span>
          </div>
        </div>
        <button className="btn-upgrade-plan">⊕ Upgrade to Growth Plan</button>
      </div>

      {/* Wallet + Coupon */}
      <div className="os-card">
        {/* Wallet */}
        <div className="wallet-row">
          <div className="wallet-left">
            <div className="wallet-icon">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="5" width="20" height="15" rx="2"/>
                <path d="M16 10h2"/><path d="M2 10h20"/>
              </svg>
            </div>
            <div>
              <p className="wallet-title">Wallet Balance</p>
              <p className="wallet-sub">₹{walletBalance.toFixed(2)} available</p>
            </div>
          </div>
          <button
            className={`btn-apply ${walletApplied ? 'applied' : ''}`}
            onClick={() => setWalletApplied(p => !p)}
          >
            {walletApplied ? 'Applied ✓' : 'Apply'}
          </button>
        </div>

        <div className="divider" />

        {/* Coupon toggle */}
        <button className="coupon-toggle" onClick={() => setCouponOpen(p => !p)}>
          <span className="coupon-toggle-label">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            Apply Coupon
          </span>
          <span style={{ transform: couponOpen ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: '0.2s' }}>⌃</span>
        </button>

        {couponOpen && (
          <div className="coupon-body">
            <div className="coupon-input-row">
              <input
                type="text"
                value={couponInput}
                onChange={e => setCouponInput(e.target.value)}
                placeholder="Enter coupon code"
                className="coupon-input"
                onKeyDown={e => e.key === 'Enter' && applyCoupon()}
              />
              <button className="btn-apply-code" onClick={applyCoupon}>Apply</button>
            </div>
            {couponError && <p className="coupon-error">{couponError}</p>}

            <div className="coupon-list">
              {COUPONS.map(c => (
                <div
                  key={c.code}
                  className={`coupon-option ${selectedCoupon === c.code ? 'selected' : ''}`}
                  onClick={() => setSelectedCoupon(c.code)}
                >
                  <div className="coupon-info">
                    <span className="coupon-code">{c.code}</span>
                    <span className="coupon-label">{c.label}</span>
                  </div>
                  <div className={`radio ${selectedCoupon === c.code ? 'radio-active' : ''}`}>
                    {selectedCoupon === c.code && <div className="radio-dot" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Totals */}
      <div className="os-card">
        <div className="totals">
          <div className="total-row">
            <span className="total-label">Subtotal</span>
            <span className="total-value">₹{fmt(subtotal)}</span>
          </div>
          {walletDiscount > 0 && (
            <div className="total-row discount">
              <span className="total-label">Wallet discount</span>
              <span className="total-value">−₹{fmt(walletDiscount)}</span>
            </div>
          )}
          <div className="total-row">
            <span className="total-label">Tax (18% GST)</span>
            <span className="total-value">₹{fmt(tax)}</span>
          </div>
        </div>
        <div className="grand-total-row">
          <span className="grand-label">Total due today</span>
          <span className="grand-value">₹{fmt(total)}</span>
        </div>
        <button className="btn-proceed" onClick={onProceed}>Proceed to Payment</button>
      </div>
    </>
  )
}