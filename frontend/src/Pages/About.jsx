import './about.css'

export default function About() {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About AgriTech Marketplace</h1>
        <p>
          AgriTech Marketplace is a simple, inclusive digital platform created to connect smallholder farmers, buyers, and agents.
          We help bring fair prices, training, credit, and a better future to farming communities across Africa.
        </p>
      </section>

      <section className="about-section">
        <h2>What We Offer</h2>
        <ul>
          <li>📦 Buy and sell farm products and inputs easily</li>
          <li>📈 Access to market prices and weather updates</li>
          <li>💳 Request microloans and affordable crop insurance</li>
          <li>🎓 Get training in farming, finance, and digital skills</li>
          <li>🚚 Book transport for crops and farming needs</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Our Vision</h2>
        <p>
          We imagine a future where every farmer in Africa thrives — 
          supported by a digital economy that respects their efforts and connects them directly to opportunities, fair trade, and essential services.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          To simplify agriculture for rural communities using easy-to-use digital tools that boost productivity,
          reduce exploitation, and promote sustainability through access to credit, training, and reliable markets.
        </p>
      </section>

      <section className="about-section">
        <h2>Who Can Use Our Platform?</h2>
        <ul>
          <li><strong>👨‍🌾 Farmers:</strong> Sell produce, access credit, and attend trainings</li>
          <li><strong>🛒 Buyers:</strong> Discover and purchase fresh produce from verified farmers</li>
          <li><strong>🧑‍💼 Agents:</strong> Assist farmers, conduct trainings, and bridge tech gaps</li>
        </ul>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} AgriTech Marketplace. Empowering Farmers, Connecting Africa.</p>
      </footer>
    </div>
  );
}
