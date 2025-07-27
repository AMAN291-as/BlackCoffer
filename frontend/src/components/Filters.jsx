
import React from 'react';
import './Filters.css'; 

const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fields = [
    'end_year',
    'topic',
    'sector',
    'region',
    'pestle',
    'source',
    'swot',
    'country',
    'city'
  ];

  return (
    <div className="filters">
      {fields.map((field) => (
        <input
          key={field}
          name={field}
          value={filters[field] || ''}
          onChange={handleChange}
          placeholder={`Filter by ${field.replace('_', ' ').toUpperCase()}`}
        />
      ))}
    </div>
  );
};

export default Filters;
