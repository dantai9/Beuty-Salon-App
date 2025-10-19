import React, { useMemo, useState } from 'react';
import HeroSection from '../sections/HeroSection.jsx';
import SearchFilters from '../components/SearchFilters.jsx';
import SalonCard from '../components/SalonCard.jsx';
import Loader from '../components/Loader.jsx';
import { useFetch } from '../hooks/useFetch.js';
import './HomePage.css';

const HomePage = () => {
  const [filters, setFilters] = useState({ city: '', service: '', search: '' });
  const { data, loading, request } = useFetch('/api/salons');

  const filteredSalons = useMemo(() => data?.salons || [], [data]);

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (filters.city) params.append('city', filters.city);
    if (filters.service) params.append('service', filters.service);
    if (filters.search) params.append('search', filters.search);
    const query = params.toString();
    request(undefined, { url: query ? `/api/salons?${query}` : '/api/salons' });
  };

  return (
    <div className="home-page">
      <HeroSection onExplore={handleSubmit} />
      <div className="home-search">
        <p>Search across our curated network of colorists, estheticians, barbers, and nail artists.</p>
        <SearchFilters filters={filters} onChange={setFilters} onSubmit={handleSubmit} />
      </div>
      <section className="salon-grid">
        <h2 className="section-title">Trending near you</h2>
        <p className="section-subtitle">
          Tailored recommendations based on popular treatments, client reviews, and seasonal moments.
        </p>
        {loading && <Loader />}
        <div className="grid">
          {filteredSalons.map((salon) => (
            <SalonCard key={salon._id} salon={salon} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
