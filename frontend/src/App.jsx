import React, { useEffect, useState } from 'react';
import { fetchData } from './components/Api';
import Filters from './components/Filters';
import ChartsDisplay from './components/ChartsDisplay';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [theme, setTheme] = useState('light');

  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchData();
        const cleaned = Array.isArray(res.data)
          ? res.data.filter(d => d.intensity && d.title)
          : [];
        setData(cleaned);
        console.log("✅ Cleaned data loaded:", cleaned.length);
      } catch (err) {
        console.error("❌ Error loading data:", err);
      }
    };
    load();
  }, []);

  const filteredData = data.filter(d =>
    (filters.end_year === '' || d.end_year?.toString().toLowerCase().includes(filters.end_year.toLowerCase())) &&
    (filters.topic === '' || d.topic?.toLowerCase().includes(filters.topic.toLowerCase())) &&
    (filters.sector === '' || d.sector?.toLowerCase().includes(filters.sector.toLowerCase())) &&
    (filters.region === '' || d.region?.toLowerCase().includes(filters.region.toLowerCase())) &&
    (filters.pestle === '' || d.pestle?.toLowerCase().includes(filters.pestle.toLowerCase())) &&
    (filters.source === '' || d.source?.toLowerCase().includes(filters.source.toLowerCase())) &&
    (filters.swot === '' || d.swot?.toLowerCase().includes(filters.swot.toLowerCase())) &&
    (filters.country === '' || d.country?.toLowerCase().includes(filters.country.toLowerCase())) &&
    (filters.city === '' || d.city?.toLowerCase().includes(filters.city.toLowerCase()))
  );

  return (
    <div className={`app ${theme}`}>
      <h1 className="dashboard-title">📊 Simple Data Dashboard</h1>
      <Filters filters={filters} setFilters={setFilters} />
      <ChartsDisplay data={filteredData} theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;
