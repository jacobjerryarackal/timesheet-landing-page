'use client';

import React, { useState } from 'react';
import Button from '../Button/Button';
import './Pricing.css';
import { 
  FiCheck, 
  FiX, 
  FiUsers, 
  FiBarChart2,
  FiClock,
  FiShield,
  FiTrendingUp,
  FiHelpCircle
} from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  features: {
    text: string;
    included: boolean;
    tooltip?: string;
  }[];
  highlight: boolean;
  buttonText: string;
  buttonVariant: 'primary' | 'secondary' | 'outline';
  popular?: boolean;
}

const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small teams getting started',
      price: billingPeriod === 'yearly' ? 9 : 12,
      period: 'per user/month',
      highlight: false,
      buttonText: 'Get Started',
      buttonVariant: 'outline',
      features: [
        { text: 'Up to 10 team members', included: true },
        { text: '8-hour daily tracking', included: true },
        { text: '40-hour weekly reports', included: true },
        { text: 'Basic dashboards', included: true },
        { text: 'Monthly analytics', included: true },
        { text: 'Email support', included: true },
        { text: 'Advanced reporting', included: false },
        { text: 'Custom workflows', included: false },
        { text: 'API access', included: false },
        { text: 'Dedicated support', included: false },
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Best for growing teams and companies',
      price: billingPeriod === 'yearly' ? 19 : 24,
      period: 'per user/month',
      highlight: true,
      popular: true,
      buttonText: 'Start Free Trial',
      buttonVariant: 'primary',
      features: [
        { text: 'Up to 50 team members', included: true },
        { text: '8-hour daily tracking', included: true },
        { text: '40-hour weekly reports', included: true },
        { text: 'Advanced dashboards', included: true },
        { text: 'Real-time analytics', included: true },
        { text: 'Priority support', included: true },
        { text: 'Advanced reporting', included: true },
        { text: 'Custom workflows', included: true },
        { text: 'API access', included: true },
        { text: 'Dedicated support', included: false },
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      price: billingPeriod === 'yearly' ? 39 : 49,
      period: 'per user/month',
      highlight: false,
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary',
      features: [
        { text: 'Unlimited team members', included: true },
        { text: '8-hour daily tracking', included: true },
        { text: '40-hour weekly reports', included: true },
        { text: 'Enterprise dashboards', included: true },
        { text: 'Real-time analytics', included: true },
        { text: '24/7 premium support', included: true },
        { text: 'Advanced reporting', included: true },
        { text: 'Custom workflows', included: true },
        { text: 'Full API access', included: true },
        { text: 'Dedicated support', included: true },
      ]
    }
  ];

  const featuresList = [
    { icon: <FiClock />, title: '8-Hour Daily Tracking', description: 'Track and optimize daily productivity' },
    { icon: <FiBarChart2 />, title: '40-Hour Weekly Reports', description: 'Comprehensive weekly performance insights' },
    { icon: <FiTrendingUp />, title: 'Monthly Analytics', description: 'Long-term trend analysis and forecasting' },
    { icon: <FiUsers />, title: 'Team Management', description: 'Manage unlimited team members and projects' },
    { icon: <FiShield />, title: 'Enterprise Security', description: 'Bank-level security and compliance' },
  ];

  const savings = billingPeriod === 'yearly' ? 25 : 0;

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-label">Pricing</div>
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-subtitle">
            Choose the perfect plan for your team. All plans include 8-hour daily and 40-hour weekly tracking.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="billing-toggle-container">
          <div className="billing-toggle">
            <button
              className={`toggle-option ${billingPeriod === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`toggle-option ${billingPeriod === 'yearly' ? 'active' : ''}`}
              onClick={() => setBillingPeriod('yearly')}
            >
              Yearly
              {savings > 0 && <span className="savings-badge">Save {savings}%</span>}
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-cards">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.highlight ? 'highlight' : ''} ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <FaCrown />
                  <span>Most Popular</span>
                </div>
              )}

              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
                
                {billingPeriod === 'yearly' && (
                  <div className="billing-note">
                    Billed annually at ${plan.price * 12}/user
                  </div>
                )}
              </div>

              <div className="plan-features">
                {plan.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-icon">
                      {feature.included ? (
                        <FiCheck className="included" />
                      ) : (
                        <FiX className="excluded" />
                      )}
                    </div>
                    <span className={`feature-text ${!feature.included ? 'disabled' : ''}`}>
                      {feature.text}
                    </span>
                    {feature.tooltip && (
                      <div className="feature-tooltip">
                        <FiHelpCircle />
                        <div className="tooltip-content">{feature.tooltip}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="plan-actions">
                <Button
                  type={plan.buttonVariant}
                  size="large"
                  fullWidth
                >
                  {plan.buttonText}
                </Button>
                {plan.id === 'professional' && (
                  <div className="trial-note">14-day free trial included</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="feature-comparison">
          <h3 className="comparison-title">All plans include:</h3>
          <div className="features-grid">
            {featuresList.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h3 className="faq-title">Frequently Asked Questions</h3>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Can I change plans later?</h4>
              <p>Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="faq-item">
              <h4>Is there a free trial?</h4>
              <p>Yes! The Professional plan includes a 14-day free trial. No credit card required to start.</p>
            </div>
            <div className="faq-item">
              <h4>How does the 8-hour tracking work?</h4>
              <p>Our system helps you track exactly 8 productive hours per day with intelligent time allocation suggestions.</p>
            </div>
            <div className="faq-item">
              <h4>What about the 40-hour weekly target?</h4>
              <p>We provide weekly reports showing your progress toward the optimal 40-hour work week target.</p>
            </div>
            <div className="faq-item">
              <h4>Do you offer custom plans?</h4>
              <p>Yes! Contact our sales team for custom enterprise plans with additional features and support.</p>
            </div>
            <div className="faq-item">
              <h4>What payment methods do you accept?</h4>
              <p>We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="enterprise-cta">
          <div className="cta-content">
            <h3>Need a custom solution?</h3>
            <p>Contact our sales team for enterprise pricing, custom features, and dedicated support.</p>
            <div className="cta-features">
              <span>✓ Custom 8-hour tracking rules</span>
              <span>✓ Advanced 40-hour weekly analytics</span>
              <span>✓ Dedicated account manager</span>
              <span>✓ SLA guarantee</span>
            </div>
          </div>
          <div className="cta-actions">
            <Button type="primary" size="large">
              Contact Sales
            </Button>
            <Button type="outline" size="large">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;