import React, { useEffect, useState } from 'react';
import './Contact.css';
import TellUs from '../components/TellUs';

export default function Contact(){
  const [selectedLocation, setSelectedLocation] = useState('corporate');

  useEffect(() => {
    document.title = 'Contact Us - UBC | United Brothers Company';
  }, []);

  const locations = {
    corporate: {
      name: 'Corporate Office',
      address: 'H.No. 8-2-334/60 & 61, Road No. 5, Banjara Hills, Hyderabad-500034, Telangana.',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5!2d78.4250!3d17.4230!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91d8b8b8b8b9%3A0x3b8b8b8b8b8b8b8b!2sRoad+No.+5%2C+Banjara+Hills%2C+Hyderabad%2C+Telangana+500034!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin',
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=H.No.+8-2-334%2F60+%26+61%2C+Road+No.+5%2C+Banjara+Hills%2C+Hyderabad-500034%2C+Telangana'
    },
    mfg: {
      name: 'Mfg. Office & Facility',
      address: 'Sy. No. 810-812, 820 & 821, Gummadidala (Village & Mandal) – 502313, Sangareddy District, Telangana.',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.5!2d78.4250!3d17.4230!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91d8b8b8b8b9%3A0x3b8b8b8b8b8b8b8b!2sGummadidala%2C+Telangana+502313!5e0!3m2!1sen!2sin!4v1234567890124!5m2!1sen!2sin',
      directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Sy.+No.+810-812%2C+820+%26+821%2C+Gummadidala%2C+Sangareddy+District%2C+Telangana+502313'
    }
  };

  const currentLocation = locations[selectedLocation];

  return (
    <main className="contact-page">
      <div className="contact-banner">
        <div className="container">
          <span className="tag">
            <span className="contact-tag-star">★</span>
            <span className="contact-tag-text">CONTACT US</span>
          </span>
        </div>
      </div>
      
      <div className="container contact-main">
        <h1 className="contact-heading">Get in touch with us</h1>
        
        <div className="contact-content">
          <div className="contact-info-panel">
            <div 
              className={`contact-item ${selectedLocation === 'corporate' ? 'active' : ''}`}
              onClick={() => setSelectedLocation('corporate')}
            >
              <h3>Corporate Office</h3>
              <p>H.No. 8-2-334/60 & 61, Road No. 5,<br/>Banjara Hills, Hyderabad-500034, Telangana.</p>
            </div>
            
            <div 
              className={`contact-item ${selectedLocation === 'mfg' ? 'active' : ''}`}
              onClick={() => setSelectedLocation('mfg')}
            >
              <h3>Mfg. Office & Facility</h3>
              <p>Sy. No. 810-812, 820 & 821,<br/>Gummadidala (Village & Mandal) –<br/>502313, Sangareddy District,<br/>Telangana.</p>
            </div>
            
            <div className="contact-item">
              <h3>Email</h3>
              <p>marketing@soilkingfoods.com</p>
            </div>
            
            <div className="contact-item">
              <h3>Call us</h3>
              <p>+91 8143150953 | 04023399533</p>
            </div>
          </div>
          
          <div className="contact-map-container">
            <div className="map-wrapper">
              <iframe
                key={selectedLocation}
                src={currentLocation.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`UBC ${currentLocation.name} Map`}
              ></iframe>
            </div>
            <button 
              className="get-directions-btn" 
              onClick={() => window.open(currentLocation.directionsUrl, '_blank')}
            >
              Get Directions
            </button>
          </div>
        </div>
      </div>
      
      <TellUs />
    </main>
  )
}
