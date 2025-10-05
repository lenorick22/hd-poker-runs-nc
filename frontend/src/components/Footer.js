import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HD Poker Runs NC</h3>
            <p>The ultimate motorcycle experience across North Carolina's beautiful roads.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/events">Events</a></li>
              <li><a href="/register">Sign Up</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@hdpokerrunsnc.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 HD Poker Runs NC. Built with ❤️ for the Harley Davidson community.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;