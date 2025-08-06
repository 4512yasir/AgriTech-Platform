import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, role, password, confirmPassword } = formData;

    if (!name || !email || !role || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Registration failed");

      toast.success("Registration successful");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4 relative">
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 bg-transparent"
            placeholder=" "
          />
          <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:top-[-16px] peer-focus:text-xs peer-focus:text-blue-500">
            Name
          </label>
        </div>

        <div className="mb-4 relative">
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 bg-transparent"
            placeholder=" "
          />
          <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:top-[-16px] peer-focus:text-xs peer-focus:text-blue-500">
            Email
          </label>
        </div>

        <div className="mb-4">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 bg-transparent text-gray-700"
            required
          >
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="agent">Agent</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>

        <div className="mb-4 relative">
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 bg-transparent"
            placeholder=" "
          />
          <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:top-[-16px] peer-focus:text-xs peer-focus:text-blue-500">
            Password
          </label>
        </div>

        <div className="mb-6 relative">
          <input
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2 bg-transparent"
            placeholder=" "
          />
          <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-focus:top-[-16px] peer-focus:text-xs peer-focus:text-blue-500">
            Confirm Password
          </label>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
