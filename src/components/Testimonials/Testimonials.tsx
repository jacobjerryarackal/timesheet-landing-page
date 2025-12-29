'use client';

import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import { 
  FiStar, 
  FiChevronLeft, 
  FiChevronRight,
} from 'react-icons/fi';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatarColor: string;
  rating: number;
  content: string;
  hoursTracked: number;
  productivityIncrease: number;
}

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Project Manager',
      company: 'TechCorp Inc.',
      avatarColor: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
      rating: 5,
      content: 'TimeTrack Pro has completely transformed how our team manages time. We consistently hit our 40-hour weekly targets with 94% accuracy. The dashboard is intuitive and the reports save us hours every week.',
      hoursTracked: 2450,
      productivityIncrease: 35
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'CTO',
      company: 'StartUpXYZ',
      avatarColor: 'linear-gradient(135deg, #10b981, #06b6d4)',
      rating: 5,
      content: 'As a fast-growing startup, tracking billable hours is crucial. TimeTrack Pro helped us increase billable hours by 42% while reducing overtime. The 8-hour daily tracking keeps everyone on target.',
      hoursTracked: 3200,
      productivityIncrease: 42
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Team Lead',
      company: 'DesignStudio',
      avatarColor: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      rating: 5,
      content: 'The visual dashboards and detailed reports have made timesheet approvals a breeze. Our team\'s productivity increased by 38% in just 3 months. Love the 6-month trend analysis feature!',
      hoursTracked: 1800,
      productivityIncrease: 38
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Operations Director',
      company: 'GlobalTech',
      avatarColor: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      rating: 5,
      content: 'We manage 500+ employees across different timezones. TimeTrack Pro\'s flexible period tracking (day, week, month, 6-month, year) gives us the insights we need at every level.',
      hoursTracked: 12500,
      productivityIncrease: 28
    },
    {
      id: 5,
      name: 'Lisa Williams',
      role: 'HR Manager',
      company: 'FinanceCorp',
      avatarColor: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
      rating: 5,
      content: 'The compliance features and detailed audit logs have been invaluable. We\'ve reduced timesheet errors by 95% and payroll processing time by 60%. Highly recommended!',
      hoursTracked: 8900,
      productivityIncrease: 40
    }
  ];

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const handlePrev = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const handleNext = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const handleDotClick = (index: number) => {
    setAutoplay(false);
    setActiveIndex(index);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar 
        key={i} 
        className={i < rating ? 'star filled' : 'star'} 
      />
    ));
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-label">Testimonials</div>
          <h2 className="section-title">Loved by Teams Worldwide</h2>
          <p className="section-subtitle">
            See how teams are achieving their 8-hour daily and 40-hour weekly targets
          </p>
        </div>

        <div className="testimonials-container">
          <div className="testimonial-carousel">
            <div className="carousel-track">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`testimonial-card ${index === activeIndex ? 'active' : ''} ${index < activeIndex ? 'prev' : ''} ${index > activeIndex ? 'next' : ''}`}
                  style={{
                    transform: `translateX(calc(${(index - activeIndex) * 120}%))`,
                    opacity: index === activeIndex ? 1 : 0.3
                  }}
                >
                  <div className="testimonial-content">
                    <FiStar className="quote-icon" />
                    
                    <div className="testimonial-header">
                      <div 
                        className="avatar"
                        style={{ background: testimonial.avatarColor }}
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="testimonial-info">
                        <h3 className="testimonial-name">{testimonial.name}</h3>
                        <p className="testimonial-role">{testimonial.role}</p>
                        <p className="testimonial-company">{testimonial.company}</p>
                      </div>
                      <div className="rating">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>

                    <p className="testimonial-text">{testimonial.content}</p>

                    <div className="testimonial-stats">
                      <div className="stat-item">
                        <div className="stat-value">{testimonial.hoursTracked.toLocaleString()}+</div>
                        <div className="stat-label">Hours Tracked</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">{testimonial.productivityIncrease}%</div>
                        <div className="stat-label">Productivity Increase</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-value">40</div>
                        <div className="stat-label">Weekly Target</div>
                      </div>
                    </div>
                  </div>

                  <div className="testimonial-footer">
                    <div className="tag">Consistent 8-hour days</div>
                    <div className="tag">Weekly targets met</div>
                    <div className="tag">Enhanced productivity</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-controls">
              <button 
                className="carousel-btn prev-btn"
                onClick={handlePrev}
                aria-label="Previous testimonial"
              >
                <FiChevronLeft />
              </button>
              
              <div className="carousel-dots">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                className="carousel-btn next-btn"
                onClick={handleNext}
                aria-label="Next testimonial"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>

          <div className="testimonial-highlights">
            <div className="highlight-card">
              <div className="highlight-icon">🎯</div>
              <h3>Perfect Target Accuracy</h3>
              <p>Teams achieve 95% accuracy on 40-hour weekly targets</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">⚡</div>
              <h3>Time Saved</h3>
              <p>Average 79% reduction in timesheet management time</p>
            </div>
            <div className="highlight-card">
              <div className="highlight-icon">📈</div>
              <h3>Productivity Boost</h3>
              <p>94% of teams report increased productivity</p>
            </div>
          </div>
        </div>

        <div className="testimonial-companies">
          <p className="companies-label">Trusted by leading companies</p>
          <div className="companies-grid">
            {['TechCorp', 'GlobalTech', 'StartUpXYZ', 'FinanceCorp', 'DesignStudio', 'InnovateCo'].map((company, index) => (
              <div key={index} className="company-logo">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;