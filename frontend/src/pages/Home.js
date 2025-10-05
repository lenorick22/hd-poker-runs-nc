import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Harley Davidson Poker Runs</h1>
          <h2>North Carolina</h2>
          <p>Join the ultimate motorcycle experience across the beautiful roads of North Carolina</p>
          <div className="hero-buttons">
            <Link to="/events" className="btn btn-primary">View Events</Link>
            <Link to="/register" className="btn btn-secondary">Join Now</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Join Our Poker Runs?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>🏍️ Premium Routes</h3>
              <p>Carefully selected scenic routes through North Carolina's most beautiful landscapes</p>
            </div>
            <div className="feature">
              <h3>🎯 Great Prizes</h3>
              <p>Win amazing prizes including Harley merchandise, gift cards, and more</p>
            </div>
            <div className="feature">
              <h3>👥 Community</h3>
              <p>Connect with fellow Harley enthusiasts and make lasting friendships</p>
            </div>
            <div className="feature">
              <h3>🛡️ Safety First</h3>
              <p>All events are organized with safety as the top priority</p>
            </div>
          </div>
        </div>
      </section>

      <section className="upcoming-events">
        <div className="container">
          <h2>Upcoming Events</h2>
          <p>Check out our latest poker runs and register today!</p>
          <Link to="/events" className="btn btn-primary">View All Events</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;