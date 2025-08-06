import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (!data.user || !data.token) {
        throw new Error("Missing user or token in response");
      }

      login(data.user, data.token);
      toast.success("Login successful");

      const role = data.user.role?.toLowerCase();

      if (role === "farmer") navigate("/farmer/dashboard");
      else if (role === "agent") navigate("/agent/dashboard");
      else if (role === "buyer") navigate("/buyer/dashboard");
      else navigate("/"); // fallback
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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

        <div className="mb-6 relative">
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

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
