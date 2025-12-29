import React from 'react';
import Button from '../Button/Button';
import './Hero.css';
import { FiCheckCircle, FiBarChart2, FiUsers, FiShield } from 'react-icons/fi';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Track Time. Boost Productivity. 
            <span className="highlight">Simplify Work.</span>
          </h1>
          <p className="hero-subtitle">
            Intelligent timesheet management for modern teams. 
            Achieve 8-hour daily goals, 40-hour weekly targets, 
            and gain insights into your team's productivity.
          </p>
          
          <div className="hero-features">
            <div className="feature-item">
              <FiCheckCircle className="feature-icon" />
              <span>8-hour daily tracking</span>
            </div>
            <div className="feature-item">
              <FiBarChart2 className="feature-icon" />
              <span>Advanced analytics</span>
            </div>
            <div className="feature-item">
              <FiUsers className="feature-icon" />
              <span>Team management</span>
            </div>
            <div className="feature-item">
              <FiShield className="feature-icon" />
              <span>Secure & reliable</span>
            </div>
          </div>

          <div className="hero-actions">
            <Button type="primary" size="large">
              Start Free Trial
            </Button>
            <Button type="outline" size="large">
              Watch Demo
            </Button>
          </div>
        </div>

        <div className="hero-image">
          <div className="dashboard-preview">
            <div className="dashboard-header">
              <div className="dashboard-title">Team Dashboard</div>
              <div className="dashboard-stats">
                <div className="stat">
                  <div className="stat-value">1,245</div>
                  <div className="stat-label">Total Hours</div>
                </div>
                <div className="stat">
                  <div className="stat-value">40</div>
                  <div className="stat-label">Avg/Week</div>
                </div>
              </div>
            </div>
            <div className="dashboard-content">
              <div className="chart-placeholder"></div>
              <div className="user-list">
                {['John Doe', 'Jane Smith', 'Alex Lee', 'Mike Wilson'].map((user) => (
                  <div key={user} className="user-item">
                    <div className="user-avatar"></div>
                    <div className="user-name">{user}</div>
                    <div className="user-hours">8.0 hrs</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;