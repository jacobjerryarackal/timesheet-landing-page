'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../Button/Button';
import './Header.css';
import { FiMenu, FiX, FiClock, FiLogIn } from 'react-icons/fi';
import { FaUserPlus } from 'react-icons/fa';

interface NavItem {
  name: string;
  href: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        <Link href="/" className="logo">
          <FiClock className="logo-icon" />
          <span>TimeTrack Pro</span>
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href="/login">
            <Button type="outline" size="small" icon={<FiLogIn />}>
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button type="primary" size="small" icon={<FaUserPlus />}>
              Get Started
            </Button>
          </Link>
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;