import React, { useMemo, useState } from 'react';
import SearchFilters from '../components/SearchFilters.jsx';
import SalonCard from '../components/SalonCard.jsx';
import Loader from '../components/Loader.jsx';
import { useFetch } from '../hooks/useFetch.js';
import './SalonsPage.css';

const SalonsPage = () => {
  const [filters, setFilters] = useState({ city: '', service: '', search: '' });
  const { data, loading, request } = useFetch('/api/salons');

  const salons = useMemo(() => data?.salons || [], [data]);

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (filters.city) params.append('city', filters.city);
    if (filters.service) params.append('service', filters.service);
    if (filters.search) params.append('search', filters.search);
    const query = params.toString();
    request(undefined, { url: query ? `/api/salons?${query}` : '/api/salons' });
  };

  return (
    <div className="salons-page">
      <header className="salons-hero glass-panel">
        <h1>Find your next signature salon</h1>
        <p>
          Filter by location, treatment type, and discover curated spaces designed for hairstyling,
          skincare, grooming, and more.
        </p>
        <SearchFilters filters={filters} onChange={setFilters} onSubmit={handleSubmit} compact />
      </header>
      {loading && <Loader />}
      <div className="salons-grid">
        {salons.map((salon) => (
          <SalonCard key={salon._id} salon={salon} />
        ))}
      </div>
    </div>
  );
};

export default SalonsPage;
