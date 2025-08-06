import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="bg-green-100 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
            Empowering Farmers, Connecting Markets
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            AgriTech Marketplace bridges the digital divide — enabling smallholder farmers across Africa to sell, learn, grow, and thrive.
          </p>
          <Link
            to="/register"
            className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">
            What You Can Do on AgriTech Marketplace
          </h2>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "🌾 Digital Marketplace",
                desc: "List, discover, and trade farm produce directly between farmers and buyers.",
              },
              {
                title: "💸 Microloan Access",
                desc: "Apply for low-interest microloans to boost your farm operations.",
              },
              {
                title: "📚 Agronomic Training",
                desc: "Access reliable farming knowledge and best practices anytime.",
              },
              {
                title: "🔒 Secure Role-Based Access",
                desc: "Whether you're a Farmer, Buyer, Agent, or Admin — we’ve got you covered.",
              },
              {
                title: "📍 Regional Listings",
                desc: "Filter by location and find produce or services near you.",
              },
              {
                title: "📲 Future: M-Pesa & Weather APIs",
                desc: "We’re working on mobile money integration and real-time forecasts.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-2 text-green-700">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-600 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Farming Journey?
          </h2>
          <p className="text-lg text-green-100 mb-8">
            Join thousands of farmers and agribusinesses creating impact across Africa.
          </p>
          <Link
            to="/register"
            className="inline-block px-6 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-100 transition"
          >
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
