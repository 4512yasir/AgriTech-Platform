import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to AgriTech Marketplace</h1>
          <p>
            Empowering African farmers, agents, and buyers through a simple and easy-to-use digital platform.
            Whether you're selling produce, buying farm inputs, or seeking agricultural knowledge —
            AgriTech is your trusted companion.
          </p>
          <div className="hero-buttons">
            <a href="/register" className="hero-btn primary">Get Started</a>
            <a href="/about" className="hero-btn secondary">Learn More</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card">
          <h3>🛒 Digital Marketplace</h3>
          <p>Buy and sell farm products and inputs easily — no middlemen, just direct access.</p>
        </div>
        <div className="feature-card">
          <h3>💰 Microloans & Support</h3>
          <p>Access affordable microloans and financial tools that help boost productivity.</p>
        </div>
        <div className="feature-card">
          <h3>📚 Training & Education</h3>
          <p>Learn modern farming techniques in simple language and improve your skills.</p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <h2>🌍 Our Vision</h2>
        <p>
          To make farming more rewarding, fair, and sustainable by connecting rural communities
          with opportunities that were once out of reach.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <h2>🎯 Our Mission</h2>
        <p>
          We aim to deliver simple, secure, and smart digital solutions that uplift farmers,
          improve food supply chains, and empower local agribusinesses.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} AgriTech Marketplace. All rights reserved.</p>
      </footer>
    </div>
  );
}
