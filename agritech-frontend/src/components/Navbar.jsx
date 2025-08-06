import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // install lucide-react if not already

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/login", label: "Login" },
    { path: "/register", label: "Register" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-700">
          🌿 AgriTech
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm px-3 py-2 rounded-md transition font-medium ${
                  isActive
                    ? "bg-green-100 text-green-800"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-green-700 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block text-sm px-3 py-2 rounded-md font-medium ${
                    isActive
                      ? "bg-green-100 text-green-800"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
