import React from 'react';
import './SearchFilters.css';

const SearchFilters = ({ filters, onChange, onSubmit, compact }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({ ...filters, [name]: value });
  };

  const submit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className={`search-filters ${compact ? 'compact' : ''}`} onSubmit={submit}>
      <label>
        <span>City</span>
        <input
          name="city"
          placeholder="e.g. New York"
          value={filters.city}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>Service</span>
        <input
          name="service"
          placeholder="Haircut, facial, manicure..."
          value={filters.service}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>Keyword</span>
        <input
          name="search"
          placeholder="Search by salon name or vibe"
          value={filters.search}
          onChange={handleChange}
        />
      </label>
      <button className="gradient-button" type="submit">
        Search salons
      </button>
    </form>
  );
};

export default SearchFilters;
