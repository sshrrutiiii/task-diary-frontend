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
    const strictRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return strictRegex.test(email);
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

  return (
    <div
      className={`app-container ${localStorage.getItem("colorTheme") || "theme-beige"} ${
        localStorage.getItem("isDarkMode") === "true" ? "dark-mode" : ""
      }`}
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,0.4)",
      }}
    >
      <div
        style={{
          background: "var(--card-bg)",
          backdropFilter: "blur(15px)",
          padding: "40px",
          borderRadius: "20px",
          border: "1px solid var(--border-color)",
          width: "100%",
          maxWidth: "380px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#ffb6b9", marginBottom: "10px" }}>🍵 Mellow</h1>
        <p style={{ color: "var(--text-color)", marginBottom: "20px" }}>
          Welcome back. Ready to focus?
        </p>

        {message && (
          <p style={{ color: isError ? "#ff6b6b" : "#4ecdc4" }}>{message}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...inputStyle, paddingRight: "40px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={buttonStyle("#4ecdc4")}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        <p
          onClick={onNavigateToSignUp}
          style={{ marginTop: "15px", cursor: "pointer", color: "#4ecdc4" }}
        >
          Don’t have an account? Sign Up
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid var(--border-color)",
  background: "var(--card-bg)",
  color: "var(--text-color)",
};

const buttonStyle = (color) => ({
  width: "100%",
  padding: "12px",
  background: color,
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
});

export default Login;