import React from 'react';
//import './SectionTag.css';

export default function SectionTag({label='OUR BRANDS'}){
  // Check if label starts with star and split it
  if (label.startsWith('★')) {
    const star = label.charAt(0);
    const text = label.slice(1).trim();
    return (
      <span className="tag">
        <span className="tag-star">{star}</span>
        {text}
      </span>
    );
  }
  return <span className="tag">{label}</span>
}
