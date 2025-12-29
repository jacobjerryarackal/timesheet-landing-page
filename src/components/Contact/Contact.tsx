'use client';

import React, { useState } from 'react';
import Button from '../Button/Button';
import './Contact.css';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock,
  FiSend,
  FiCheckCircle,
  FiMessageSquare,
  FiUser,
  FiCalendar
} from 'react-icons/fi';

interface FormData {
  name: string;
  email: string;
  company: string;
  plan: string;
  message: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  details: string[];
  color: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    plan: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo: ContactInfo[] = [
    {
      icon: <FiMail />,
      title: 'Email Us',
      details: ['support@timetrackpro.com', 'sales@timetrackpro.com'],
      color: '#3b82f6'
    },
    {
      icon: <FiPhone />,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', 'Mon-Fri, 9AM-6PM EST'],
      color: '#10b981'
    },
    {
      icon: <FiMapPin />,
      title: 'Visit Us',
      details: ['123 Tech Street', 'San Francisco, CA 94107'],
      color: '#8b5cf6'
    },
    {
      icon: <FiClock />,
      title: 'Support Hours',
      details: ['24/7 Premium Support', '1-hour response time'],
      color: '#f59e0b'
    }
  ];

  const plans = [
    { value: '', label: 'Select a plan' },
    { value: 'starter', label: 'Starter - Getting started' },
    { value: 'professional', label: 'Professional - Growing team' },
    { value: 'enterprise', label: 'Enterprise - Custom solution' },
    { value: 'demo', label: 'Schedule a demo' },
    { value: 'support', label: 'Technical support' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        company: '',
        plan: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-label">Contact Us</div>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            Have questions about 8-hour daily tracking or 40-hour weekly targets? We're here to help.
          </p>
        </div>

        <div className="contact-container">
          {/* Contact Info Cards */}
          <div className="contact-info">
            <div className="info-header">
              <h3>Let's Start Tracking Time Smarter</h3>
              <p>Our team is ready to help you optimize your team's productivity</p>
            </div>

            <div className="info-cards">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-card">
                  <div 
                    className="info-icon-wrapper"
                    style={{ background: `${info.color}15`, color: info.color }}
                  >
                    {info.icon}
                  </div>
                  <div className="info-content">
                    <h4>{info.title}</h4>
                    {info.details.map((detail, i) => (
                      <p key={i}>{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Support Hours */}
            <div className="support-hours">
              <div className="hours-header">
                <FiCalendar />
                <h4>Extended Support Hours for Enterprise</h4>
              </div>
              <div className="hours-grid">
                <div className="hour-item">
                  <div className="hour-day">Mon-Fri</div>
                  <div className="hour-time">24/7 Priority Support</div>
                </div>
                <div className="hour-item">
                  <div className="hour-day">Saturday</div>
                  <div className="hour-time">8AM - 8PM EST</div>
                </div>
                <div className="hour-item">
                  <div className="hour-day">Sunday</div>
                  <div className="hour-time">10AM - 6PM EST</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <div className="form-header">
              <h3>Send us a message</h3>
              <p>We'll respond within 24 hours</p>
            </div>

            {isSubmitted ? (
              <div className="success-message">
                <FiCheckCircle className="success-icon" />
                <h4>Thank you for your message!</h4>
                <p>We've received your inquiry about our timesheet system. Our team will contact you within 24 hours to discuss your 8-hour daily tracking needs.</p>
                <div className="success-details">
                  <div className="detail">
                    <FiUser />
                    <span>We'll help you set up</span>
                  </div>
                  <div className="detail">
                    <FiClock />
                    <span>40-hour weekly tracking</span>
                  </div>
                  <div className="detail">
                    <FiMessageSquare />
                    <span>Personalized demo</span>
                  </div>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">
                    <FiUser />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FiMail />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="plan">Interested In</label>
                    <select
                      id="plan"
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                    >
                      {plans.map((plan) => (
                        <option key={plan.value} value={plan.value}>
                          {plan.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    <FiMessageSquare />
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your timesheet needs, team size, and specific requirements..."
                    rows={6}
                    required
                  />
                </div>

                <div className="form-footer">
                  <div className="privacy-note">
                    By submitting this form, you agree to our privacy policy. We'll never share your information.
                  </div>
                  <Button
                    type="primary"
                    size="large"
                    icon={<FiSend />}
                    disabled={isSubmitting}
                    fullWidth
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;