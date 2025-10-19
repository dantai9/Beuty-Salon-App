import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, caption, trend }) => (
  <div className="stat-card glass-panel">
    <h4>{title}</h4>
    <p className="value">{value}</p>
    <p className="caption">{caption}</p>
    {trend && <span className={`trend ${trend.startsWith('+') ? 'up' : 'down'}`}>{trend}</span>}
  </div>
);

export default StatCard;
