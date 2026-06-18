import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await registerUser(form);

      // Backend returns message or similar
      toast.success("Registered successfully! Please login.");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join HostelCare to submit and track complaints</p>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-input"
              placeholder="John Doe"
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-input"
              placeholder="name@example.com"
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-input"
              placeholder="Create a strong password"
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="btn-primary auth-button" disabled={isLoading}>
            {isLoading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/" className="auth-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
}