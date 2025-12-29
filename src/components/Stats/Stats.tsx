'use client';

import React, { useEffect, useState } from 'react';
import './Stats.css';
import { 
  FiUsers, 
  FiClock, 
  FiTrendingUp, 
  FiCheckCircle,
  FiZap
} from 'react-icons/fi';

interface Stat {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  color: string;
  gradient: string;
}

const Stats: React.FC = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [animated, setAnimated] = useState(false);
  
  const stats: Stat[] = [
    {
      icon: <FiUsers />,
      value: 499,
      label: 'Active Teams',
      suffix: '+',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
    },
    {
      icon: <FiClock />,
      value: 1.2,
      label: 'Hours Tracked',
      suffix: 'M+',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    },
    {
      icon: <FiTrendingUp />,
      value: 94,
      label: 'Productivity Increase',
      suffix: '%',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
      icon: <FiZap />,
      value: 79,
      label: 'Time Saved',
      suffix: '%',
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('stats');
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100 && !animated) {
          setAnimated(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animated]);

  useEffect(() => {
    if (!animated) return;

    const duration = 1800;
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
  }, [animated, stats]);

  return (
    <section className="stats" id="stats">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-label">Our Impact</div>
          <h2 className="section-title">Trusted by Teams Worldwide</h2>
          <p className="section-subtitle">
            Join hundreds of teams who have transformed their time management
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div 
                className="stat-icon-wrapper"
                style={{ background: stat.gradient }}
              >
                {stat.icon}
              </div>
              
              <div className="stat-content">
                <div className="stat-value-container">
                  <h3 className="stat-value">
                    {stat.suffix === 'M+' ? counts[index].toFixed(1) : 
                     stat.value % 1 === 0 ? Math.floor(counts[index]) : 
                     counts[index].toFixed(1)}
                  </h3>
                  <span className="stat-suffix">{stat.suffix}</span>
                </div>
                <p className="stat-label">{stat.label}</p>
              </div>

              <div className="stat-progress">
                <div 
                  className="stat-progress-bar"
                  style={{
                    width: `${animated ? 100 : 0}%`,
                    background: stat.gradient
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="stats-description">
          <div className="description-item">
            <div className="description-icon">🎯</div>
            <div className="description-content">
              <h4>8-Hour Daily Goal</h4>
              <p>Track and achieve optimal daily productivity targets</p>
            </div>
          </div>
          <div className="description-item">
            <div className="description-icon">📈</div>
            <div className="description-content">
              <h4>40-Hour Weekly Target</h4>
              <p>Maintain perfect work-life balance with weekly tracking</p>
            </div>
          </div>
          <div className="description-item">
            <div className="description-icon">🏆</div>
            <div className="description-content">
              <h4>Monthly Insights</h4>
              <p>Gain deep insights into long-term productivity trends</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;