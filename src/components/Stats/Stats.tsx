'use client';

import React, { useEffect, useState } from 'react';
import './Stats.css';
import { FiUsers, FiClock, FiBarChart2, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';

interface Stat {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  color: string;
}

const Stats: React.FC = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0, 0]);
  
  const stats: Stat[] = [
    {
      icon: <FiUsers />,
      value: 500,
      label: 'Active Teams',
      suffix: '+',
      color: '#3b82f6'
    },
    {
      icon: <FiClock />,
      value: 1.2,
      label: 'Hours Tracked',
      suffix: 'M+',
      color: '#8b5cf6'
    },
    {
      icon: <FiBarChart2 />,
      value: 95,
      label: 'Productivity Increase',
      suffix: '%',
      color: '#10b981'
    },
    {
      icon: <FiCheckCircle />,
      value: 99.9,
      label: 'Uptime',
      suffix: '%',
      color: '#f59e0b'
    },
    {
      icon: <FiTrendingUp />,
      value: 80,
      label: 'Time Saved',
      suffix: '%',
      color: '#ef4444'
    }
  ];

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = stats.map(stat => stat.value / steps);
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCounts(prev => prev.map((count, i) => 
        Math.min(count + increment[i], stats[i].value)
      ));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="stats" id="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon-wrapper" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <h3 className="stat-value">
                  {stat.suffix === 'M+' ? counts[index].toFixed(1) : Math.floor(counts[index])}
                  <span className="stat-suffix">{stat.suffix}</span>
                </h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;