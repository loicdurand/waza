import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`glass ${className}`}>
      {children}
    </div>
  );
};

export default Card;
