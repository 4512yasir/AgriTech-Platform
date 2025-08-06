import React from "react";

const About = () => {
  return (
    <div className="bg-white min-h-screen text-gray-800">
      <section className="py-20 bg-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-6">
            About AgriTech Marketplace
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Our mission is to digitally empower smallholder farmers across Africa
            through access to markets, microloans, knowledge, and fair opportunities.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Why AgriTech?
            </h2>
            <p className="text-gray-700 mb-4">
              Agriculture is the backbone of Africa's economy, yet millions of smallholder
              farmers lack access to modern tools, financial support, and profitable markets.
              AgriTech Marketplace exists to close this gap using technology.
            </p>
            <p className="text-gray-700">
              By building a digital ecosystem for farmers, buyers, and agents, we aim to
              create a future where agriculture is not just a way of life—but a sustainable,
              empowered business.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              What Makes Us Different?
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Farmer-first design:</strong> Our platform is easy to use and accessible from mobile.
              </li>
              <li>
                <strong>Integrated finance:</strong> Built-in microloan tools for growth.
              </li>
              <li>
                <strong>Smart listings:</strong> Sell your produce regionally or nationally.
              </li>
              <li>
                <strong>Training & support:</strong> Learn modern farming techniques anytime.
              </li>
              <li>
                <strong>Data & insights:</strong> Make informed decisions based on real-time data.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-green-50 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Built for Africa, by Africans 🌍
          </h2>
          <p className="text-gray-700 text-lg">
            AgriTech Marketplace is proudly designed by a passionate team of developers,
            agricultural experts, and local agents who understand the real challenges farmers face.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
