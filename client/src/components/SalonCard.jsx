import React from 'react';
import { Link } from 'react-router-dom';
import './SalonCard.css';

const SalonCard = ({ salon }) => {
  const averagePrice = Math.round(
    salon.services?.reduce((acc, service) => acc + service.price, 0) / (salon.services?.length || 1)
  );

  return (
    <article className="salon-card glass-panel">
      <div className="salon-media">
        <img src={salon.coverImage || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'} alt={salon.name} />
        <span className="salon-city">{salon.city}</span>
      </div>
      <div className="salon-body">
        <div className="salon-header">
          <h3>{salon.name}</h3>
          <span className="salon-rating">{(salon.rating?.average || 0).toFixed(1)}★</span>
        </div>
        <p className="salon-description">{salon.description}</p>
        <ul className="salon-services">
          {salon.services?.slice(0, 3).map((service) => (
            <li key={service.service}>
              <span>{service.service}</span>
              <span>${service.price}</span>
            </li>
          ))}
        </ul>
        <div className="salon-footer">
          <div>
            <small>Avg. price</small>
            <strong>${Number.isNaN(averagePrice) ? '—' : averagePrice}</strong>
          </div>
          <Link className="gradient-button" to={`/salons/${salon._id}`}>
            View details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SalonCard;
