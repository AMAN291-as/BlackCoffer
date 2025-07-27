import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
  ScatterChart, Scatter, ZAxis
} from 'recharts';
import './ChartsDisplay.css';

const ChartsDisplay = ({ data, theme, setTheme }) => {
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00bcd4', '#e91e63', '#4caf50'];

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const groupByField = (field) =>
    Object.values(
      data.reduce((acc, curr) => {
        if (curr[field] && curr.intensity > 0) {
          acc[curr[field]] = acc[curr[field]] || { [field]: curr[field], intensity: 0 };
          acc[curr[field]].intensity += curr.intensity;
        }
        return acc;
      }, {})
    ).slice(0, 10);

  const groupByCount = (field) =>
    Object.values(
      data.reduce((acc, curr) => {
        if (curr[field]) {
          acc[curr[field]] = acc[curr[field]] || { [field]: curr[field], count: 0 };
          acc[curr[field]].count += 1;
        }
        return acc;
      }, {})
    ).slice(0, 10);

  const countryData = groupByField('country');
  const regionData = groupByField('region');
  const topicCount = groupByCount('topic');
  const pestleData = groupByField('pestle');
  const yearData = groupByField('start_year');
  const relevanceData = groupByCount('relevance');
  const likelihoodData = groupByCount('likelihood');

  const bubbleData = data.filter(d =>
    typeof d.relevance === 'number' &&
    typeof d.likelihood === 'number' &&
    typeof d.intensity === 'number'
  );

  return (
    <div className={`chart-container ${theme}`}>
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

     
      <h3>🌍 Intensity by Country (Bar)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={countryData}>
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="intensity" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h3>🗺️ Intensity by Region (Bar)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={regionData}>
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="intensity" fill="#ff7f50" />
        </BarChart>
      </ResponsiveContainer>

      <h3>🧠 Top Topics by Count (Bar)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topicCount}>
          <XAxis dataKey="topic" angle={-45} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4caf50" />
        </BarChart>
      </ResponsiveContainer>

     
      <h3>🔥 Likelihood Count (Pie)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={likelihoodData}
            dataKey="count"
            nameKey="likelihood"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {likelihoodData.map((entry, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <h3>⚡ Relevance Count (Pie)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={relevanceData}
            dataKey="count"
            nameKey="relevance"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {relevanceData.map((entry, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <h3>📈 PESTLE Intensity (Line)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={pestleData}>
          <XAxis dataKey="pestle" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="intensity" stroke="#e91e63" />
        </LineChart>
      </ResponsiveContainer>

      <h3>📅 Intensity by Start Year (Line)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={yearData}>
          <XAxis dataKey="start_year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="intensity" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>

     
      <h3>📡 Bubble Chart: Relevance vs Likelihood</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <XAxis dataKey="relevance" />
          <YAxis dataKey="likelihood" />
          <ZAxis dataKey="intensity" range={[50, 500]} />
          <Tooltip />
          <Scatter data={bubbleData} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartsDisplay;
