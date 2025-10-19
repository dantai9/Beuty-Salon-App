import React, { useState } from 'react';
import './BookingForm.css';

const defaultState = {
  service: '',
  scheduledAt: '',
  notes: '',
};

const BookingForm = ({ salon, onSubmit, submitting }) => {
  const [form, setForm] = useState(defaultState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form)
      .then(() => setForm(defaultState))
      .catch(() => {});
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h3>Reserve a visit</h3>
      <label>
        <span>Select service</span>
        <select name="service" value={form.service} onChange={handleChange} required>
          <option value="" disabled>
            Choose a service
          </option>
          {salon.services?.map((service) => (
            <option key={service.service} value={service.service}>
              {service.service} — ${service.price}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>Date & time</span>
        <input type="datetime-local" name="scheduledAt" value={form.scheduledAt} onChange={handleChange} required />
      </label>
      <label>
        <span>Notes (optional)</span>
        <textarea
          name="notes"
          placeholder="Share preferences, allergies, or styling inspiration"
          value={form.notes}
          onChange={handleChange}
          rows={4}
        />
      </label>
      <button className="gradient-button" type="submit" disabled={submitting}>
        {submitting ? 'Booking...' : 'Confirm appointment'}
      </button>
    </form>
  );
};

export default BookingForm;
