import React from 'react';
import Link from 'next/link';
import './Footer.css';
import { FiClock, FiFacebook, FiTwitter, FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <FiClock />
              <span>TimeTrack Pro</span>
            </Link>
            <p className="footer-description">
              Smart timesheet management for modern teams. 
              Achieve 8-hour daily goals and 40-hour weekly targets.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link"><FiFacebook /></a>
              <a href="#" className="social-link"><FiTwitter /></a>
              <a href="#" className="social-link"><FiLinkedin /></a>
              <a href="#" className="social-link"><FiGithub /></a>
              <a href="#" className="social-link"><FiMail /></a>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h3 className="link-title">Product</h3>
              <Link href="/features">Features</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/demo">Demo</Link>
              <Link href="/updates">Updates</Link>
            </div>
            
            <div className="link-group">
              <h3 className="link-title">Company</h3>
              <Link href="/about">About</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/press">Press</Link>
            </div>
            
            <div className="link-group">
              <h3 className="link-title">Support</h3>
              <Link href="/help">Help Center</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            © {currentYear} TimeTrack Pro. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <Link href="/privacy">Privacy Policy</Link>
            <span className="divider">•</span>
            <Link href="/terms">Terms of Service</Link>
            <span className="divider">•</span>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;