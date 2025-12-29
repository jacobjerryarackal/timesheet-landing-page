import React from 'react';
import './Features.css';
import { 
  FiTrendingUp, 
  FiCalendar, 
  FiPieChart, 
  FiTarget,
  FiClock,
  FiBarChart,
  FiUsers,
  FiShield
} from 'react-icons/fi';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <FiTrendingUp />,
      title: 'Real-time Analytics',
      description: 'Track hours in real-time with detailed insights into daily, weekly, and monthly performance.',
      color: '#3b82f6'
    },
    {
      icon: <FiCalendar />,
      title: 'Flexible Period Tracking',
      description: 'Monitor hours for day, week, month, 6 months, or year with customizable reporting periods.',
      color: '#8b5cf6'
    },
    {
      icon: <FiPieChart />,
      title: 'Visual Dashboards',
      description: 'Beautiful charts and graphs to visualize team productivity and individual contributions.',
      color: '#10b981'
    },
    {
      icon: <FiTarget />,
      title: 'Goal Setting',
      description: 'Set and track 8-hour daily and 40-hour weekly targets with automatic notifications.',
      color: '#f59e0b'
    },
    {
      icon: <FiClock />,
      title: 'Overtime Management',
      description: 'Automatically track and report overtime hours with compliance alerts.',
      color: '#ef4444'
    },
    {
      icon: <FiBarChart />,
      title: 'Export & Reports',
      description: 'Generate detailed PDF/Excel reports for payroll, accounting, and compliance.',
      color: '#06b6d4'
    },
    {
      icon: <FiUsers />,
      title: 'Team Collaboration',
      description: 'Assign projects, track team hours, and collaborate in real-time.',
      color: '#8b5cf6'
    },
    {
      icon: <FiShield />,
      title: 'Enterprise Security',
      description: 'Bank-level security with role-based access control and audit logs.',
      color: '#10b981'
    }
  ];

  return (
    <section className="features section-padding" id="features">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-label">Features</div>
          <h2 className="section-title">Everything You Need to Track Time Effectively</h2>
          <p className="section-subtitle">
            Powerful tools designed to help teams achieve their 8-hour daily and 40-hour weekly targets
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper" style={{ background: `${feature.color}15` }}>
                <div className="feature-icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-line" style={{ background: feature.color }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;