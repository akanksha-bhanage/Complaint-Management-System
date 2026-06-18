import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await loginUser({ email, password });

      if (!res.token) {
        toast.error(res.message || "Login failed");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.user.role);
      localStorage.setItem("name", res.user.name || "");
      localStorage.setItem("email", res.user.email || "");

      toast.success("Logged in successfully!");

      if (res.user.role === "user") {
        navigate("/user");
      } else if (res.user.role === "admin") {
        navigate("/admin");
      } else if (res.user.role === "staff") {
        navigate("/staff");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to HostelCare to manage your complaints</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="btn-primary auth-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/register" className="auth-link">Register here</Link>
        </div>
      </div>
    </div>
  );
}