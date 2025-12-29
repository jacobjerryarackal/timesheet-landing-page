import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  type = 'primary', 
  size = 'medium', 
  onClick, 
  className = '',
  disabled = false 
}) => {
  return (
    <button
      className={`btn btn-${type} btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;