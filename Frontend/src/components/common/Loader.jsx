import React from 'react';

export default function Loader({ size = 'medium', color = 'primary' }) {
  const sizeClass = size === 'small' ? 'loader-small' : size === 'large' ? 'loader-large' : 'loader-medium';
  
  return (
    <div className={`loader ${sizeClass} loader-${color}`}>
      <div className="spinner"></div>
    </div>
  );
}
