import React, { useState } from "react";
import axios from "axios";

function SignUp({ onNavigateToLogin, setLoggedInUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (!validateEmail(email)) return setError("Enter valid email");
    if (password.length < 6) return setError("Min 6 chars");
    if (password !== confirmPassword) return setError("Passwords mismatch");

    setLoading(true);
    setMessage("Creating account...");

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/users/register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        setLoading(false);
        setMessage("Account created!");
        setIsError(false);
        setTimeout(() => setLoggedInUser(res.data), 800);
      })
      .catch(() => {
        setLoading(false);
        setMessage("Registration failed!");
        setIsError(true);
      });
  };

  const setError = (msg) => {
    setMessage(msg);
    setIsError(true);
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
      <div style={cardStyle}>
        <h1 style={{ color: "#ffb6b9" }}>🍵 Mellow</h1>
        <p style={{ color: "var(--text-color)" }}>
          Join the aesthetic study space.
        </p>

        {message && (
          <p style={{ color: isError ? "#ff6b6b" : "#4ecdc4" }}>{message}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...inputStyle, paddingRight: "40px" }}
            />
            <span onClick={() => setShowPassword(!showPassword)} style={eyeStyle}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
          />

          <button style={buttonStyle("#ffb6b9")}>
            {loading ? "Creating..." : "SIGN UP"}
          </button>
        </form>

        <p onClick={onNavigateToLogin} style={linkStyle}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "var(--card-bg)",
  backdropFilter: "blur(15px)",
  padding: "40px",
  borderRadius: "20px",
  border: "1px solid var(--border-color)",
  maxWidth: "380px",
  width: "100%",
  textAlign: "center",
};

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

const eyeStyle = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
};

const linkStyle = {
  marginTop: "15px",
  cursor: "pointer",
  color: "#4ecdc4",
};

export default SignUp;