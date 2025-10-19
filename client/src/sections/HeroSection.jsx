import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = ({ onExplore }) => (
  <section className="hero glass-panel">
    <div className="hero-content">
      <p className="hero-tag">ARTFULLY CURATED SALONS</p>
      <h1>
        Book your next <span>beauty ritual</span> with confidence
      </h1>
      <p className="hero-subtitle">
        Discover award-winning stylists, transparent pricing, and real customer stories. GlowUp
        makes finding your perfect salon an indulgent experience.
      </p>
      <div className="hero-actions">
        <Link className="gradient-button" to="/salons" onClick={onExplore}>
          Explore salons
        </Link>
        <button className="ghost-button" onClick={onExplore}>
          Watch how it works
        </button>
      </div>
      <dl className="hero-stats">
        <div>
          <dt>3k+</dt>
          <dd>Monthly bookings</dd>
        </div>
        <div>
          <dt>4.9★</dt>
          <dd>Average salon rating</dd>
        </div>
        <div>
          <dt>120</dt>
          <dd>Curated partners</dd>
        </div>
      </dl>
    </div>
    <div className="hero-art">
      <div className="hero-card">
        <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80" alt="Hair styling" />
        <div className="hero-card-overlay">
          <h3>Blonde Atelier</h3>
          <p>Balayage • Color Correction</p>
        </div>
      </div>
      <div className="floating-card one">
        <p>“The ambient lighting and friendly staff were perfect.”</p>
        <span>— Mira, skincare facial</span>
      </div>
      <div className="floating-card two">
        <p>“Booking took seconds and I love the reminder texts.”</p>
        <span>— David, grooming cut</span>
      </div>
    </div>
  </section>
);

export default HeroSection;
