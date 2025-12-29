import React from 'react';
import Button from '../Button/Button';
import './Hero.css';
import { FiCheckCircle, FiBarChart2, FiUsers, FiShield, FiPlay } from 'react-icons/fi';

const Hero: React.FC = () => {
  const features = [
    { icon: <FiCheckCircle />, text: '8-hour daily tracking' },
    { icon: <FiBarChart2 />, text: 'Advanced analytics' },
    { icon: <FiUsers />, text: 'Team management' },
    { icon: <FiShield />, text: 'Secure & reliable' },
  ];

  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span>✨</span> Trusted by 500+ teams worldwide
          </div>
          
          <h1 className="hero-title">
            Track Time. <span className="gradient-text">Boost Productivity.</span>
            <br />
            <span className="highlight">Simplify Work.</span>
          </h1>
          
          <p className="hero-subtitle">
            Intelligent timesheet management for modern teams. Achieve 8-hour daily goals, 
            40-hour weekly targets, and gain insights into your team's productivity with 
            powerful analytics.
          </p>
          
          <div className="hero-features">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">{feature.icon}</div>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="hero-actions">
            <Button type="primary" size="large">
              Start Free Trial
            </Button>
            <Button type="outline" size="large" icon={<FiPlay />}>
              Watch Demo
            </Button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">No credit card required</div>
              <div className="stat-label">Free 14-day trial</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">24/7 Support</div>
              <div className="stat-label">Always here to help</div>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="dashboard-preview">
            <div className="dashboard-header">
              <div className="dashboard-title">
                <div className="dashboard-icon"></div>
                Team Dashboard
              </div>
              <div className="dashboard-period">This Week</div>
            </div>
            
            <div className="dashboard-stats">
              <div className="dashboard-stat">
                <div className="stat-number">1,245</div>
                <div className="stat-label">Total Hours</div>
              </div>
              <div className="dashboard-stat">
                <div className="stat-number">40</div>
                <div className="stat-label">Avg/Week</div>
              </div>
              <div className="dashboard-stat">
                <div className="stat-number">12</div>
                <div className="stat-label">Pending</div>
              </div>
            </div>

            <div className="dashboard-chart">
              <div className="chart-placeholder">
                <div className="chart-bar" style={{ height: '80%' }}></div>
                <div className="chart-bar" style={{ height: '100%' }}></div>
                <div className="chart-bar" style={{ height: '60%' }}></div>
                <div className="chart-bar" style={{ height: '90%' }}></div>
                <div className="chart-bar" style={{ height: '70%' }}></div>
              </div>
            </div>

            <div className="user-list">
              <div className="user-item">
                <div className="user-avatar user-avatar-1"></div>
                <div className="user-info">
                  <div className="user-name">John Doe</div>
                  <div className="user-project">Client Project</div>
                </div>
                <div className="user-hours">8.0 hrs</div>
              </div>
              <div className="user-item">
                <div className="user-avatar user-avatar-2"></div>
                <div className="user-info">
                  <div className="user-name">Jane Smith</div>
                  <div className="user-project">Internal Dev</div>
                </div>
                <div className="user-hours">7.5 hrs</div>
              </div>
              <div className="user-item">
                <div className="user-avatar user-avatar-3"></div>
                <div className="user-info">
                  <div className="user-name">Alex Lee</div>
                  <div className="user-project">Marketing</div>
                </div>
                <div className="user-hours">8.0 hrs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;