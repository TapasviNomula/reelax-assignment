import React, { useState } from 'react'
import './BillingForm.css'

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi",
  "Jammu & Kashmir","Ladakh","Chandigarh","Puducherry",
]

const CITIES_BY_STATE = {
  Maharashtra: ["Mumbai","Pune","Nagpur","Nashik","Thane"],
  Karnataka:   ["Bengaluru","Mysuru","Hubli","Mangaluru"],
  Delhi:       ["New Delhi","Dwarka","Rohini","Saket"],
  Gujarat:     ["Ahmedabad","Surat","Vadodara","Rajkot"],
  "Tamil Nadu":["Chennai","Coimbatore","Madurai","Salem"],
  Telangana:   ["Hyderabad","Warangal","Nizamabad"],
  "Uttar Pradesh":["Lucknow","Kanpur","Agra","Noida"],
  "West Bengal":["Kolkata","Howrah","Durgapur"],
  Rajasthan:   ["Jaipur","Jodhpur","Udaipur","Kota"],
  "Madhya Pradesh":["Bhopal","Indore","Gwalior"],
}

function InputField({ label, value, onChange, placeholder, type = 'text' }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`field-input ${focused ? 'focused' : ''}`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

function SelectField({ label, value, onChange, options, placeholder }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <div className={`select-wrapper ${focused ? 'focused' : ''}`}>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`field-select ${!value ? 'placeholder' : ''}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <span className="chevron">▾</span>
      </div>
    </div>
  )
}

export default function BillingForm({ form, updateField, onCancel, onSave }) {
  const cities = form.state ? (CITIES_BY_STATE[form.state] || []) : []

  return (
    <section className="billing-card">
      <h1 className="billing-title">Review your details</h1>
      <h2 className="billing-subtitle">Billing Information</h2>

      <div className="billing-grid">
        <InputField label="Company Name" value={form.company} onChange={v => updateField('company', v)} placeholder="Company name" />
        <InputField label="Email" type="email" value={form.email} onChange={v => updateField('email', v)} placeholder="email@example.com" />
        <InputField label="GST Number (Optional)" value={form.gst} onChange={v => updateField('gst', v)} placeholder="GST Number" />
        <InputField label="PAN Number (Optional)" value={form.pan} onChange={v => updateField('pan', v)} placeholder="PAN Number" />
        <InputField label="Premise/House no." value={form.premise} onChange={v => updateField('premise', v)} placeholder="Premise/House no." />
        <InputField label="Street" value={form.street} onChange={v => updateField('street', v)} placeholder="Street" />
        <SelectField label="State" value={form.state} onChange={v => updateField('state', v)} options={INDIAN_STATES} placeholder="Select state" />
        <SelectField label="City" value={form.city} onChange={v => updateField('city', v)} options={cities} placeholder="Select city" />
        <InputField label="Country" value={form.country} onChange={v => updateField('country', v)} placeholder="Country" />
        <InputField label="Pin Code" value={form.pincode} onChange={v => updateField('pincode', v)} placeholder="Pincode" />
      </div>

      <div className="billing-actions">
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        <button className="btn-save" onClick={onSave}>Save Details</button>
      </div>
    </section>
  )
}