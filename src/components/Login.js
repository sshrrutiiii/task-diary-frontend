import React, { useState } from "react";
import axios from "axios";

function Login({ setLoggedInUser, onNavigateToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Enter a valid email!");
      setIsError(true);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters!");
      setIsError(true);
      return;
    }

    setMessage("Logging in...");
    setIsError(false);
    setLoading(true);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/users/login`, { email, password })
      .then((res) => {
        setLoading(false);
        if (res.data && res.data.email) {
          setMessage("Login successful!");
          setIsError(false);
          setTimeout(() => setLoggedInUser(res.data), 800);
        } else {
          setMessage("Invalid email or password!");
          setIsError(true);
        }
      })
      .catch(() => {
        setLoading(false);
        setMessage("Login failed. Check credentials.");
        setIsError(true);
      });
  };

  const inputStyle = {
    width: "100%", padding: "14px 15px", marginBottom: "15px", background: "var(--card-bg)",
    border: "1px solid var(--border-color)", borderRadius: "8px", color: "var(--text-color)", fontSize: "0.95rem"
  };

  return (
    <div className="app-container"> {/* ✅ Fix 3: Simplified class */}
      <div style={{ maxWidth: "380px", margin: "auto", padding: "40px" }}>
        <h1 style={{ color: "#ffb6b9" }}>🍵 Mellow</h1>
        {message && <p style={{ color: isError ? "red" : "green" }}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} required />
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "10px", marginTop: "10px" }}>
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>
        <p onClick={onNavigateToSignUp} style={{ cursor: "pointer", marginTop: "15px" }}>Sign Up</p>
      </div>
    </div>
  );
}

export default Login;