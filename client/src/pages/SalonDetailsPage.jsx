import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import ReviewList from '../components/ReviewList.jsx';
import BookingForm from '../components/BookingForm.jsx';
import { useFetch } from '../hooks/useFetch.js';
import { useAuth } from '../context/AuthContext.jsx';
import './SalonDetailsPage.css';

const SalonDetailsPage = () => {
  const { id } = useParams();
  const { isAuthenticated, token } = useAuth();
  const { data, loading, request } = useFetch(`/api/salons/${id}`);
  const [booking, setBooking] = useState(false);
  const [feedback, setFeedback] = useState('');

  if (loading && !data) {
    return <Loader />;
  }

  const salon = data?.salon;
  const reviews = data?.reviews || [];

  const handleBooking = async (form) => {
    try {
      setBooking(true);
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ ...form, salonId: id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create appointment');
      }

      setFeedback('Appointment requested successfully! You will receive a confirmation soon.');
      request();
    } catch (error) {
      setFeedback(error.message);
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="salon-details">
      <div className="salon-hero glass-panel">
        <img
          src={
            salon?.coverImage ||
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80'
          }
          alt={salon?.name}
        />
        <div className="salon-info">
          <h1>{salon?.name}</h1>
          <p className="location">{salon?.address}</p>
          <p className="description">{salon?.description}</p>
          <div className="chips">
            {salon?.amenities?.map((amenity) => (
              <span key={amenity}>{amenity}</span>
            ))}
          </div>
        </div>
      </div>
      <section className="salon-content">
        <div className="salon-services-panel glass-panel">
          <h2>Signature services</h2>
          <ul>
            {salon?.services?.map((service) => (
              <li key={service.service}>
                <div>
                  <strong>{service.service}</strong>
                  <small>{service.duration} min</small>
                </div>
                <span>${service.price}</span>
              </li>
            ))}
          </ul>
          {isAuthenticated ? (
            <BookingForm salon={salon} onSubmit={handleBooking} submitting={booking} />
          ) : (
            <p className="login-notice">Sign in to reserve your experience.</p>
          )}
          {feedback && <p className="feedback">{feedback}</p>}
        </div>
        <div className="reviews-panel glass-panel">
          <h2>Recent reviews</h2>
          <ReviewList reviews={reviews} />
        </div>
      </section>
    </div>
  );
};

export default SalonDetailsPage;
