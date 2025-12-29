'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '../Button/Button';
import './Header.css';
import { FiMenu, FiX, FiClock } from 'react-icons/fi';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <FiClock className="logo-icon" />
          <span>TimeTrack Pro</span>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="nav-link" onClick={() => setIsMenuOpen(false)}>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/login">
            <Button type="outline" size="small">Login</Button>
          </Link>
          <Link href="/signup">
            <Button type="primary" size="small">Get Started</Button>
          </Link>
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;