import React, { useState } from "react";
import axios from "axios";

function Login({ setLoggedInUser, onNavigateToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Logging in...");
    setIsError(false);

    // ✅ Uses .env variable for backend URL
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/users/login`, { email, password })
      .then((res) => {
        if (res.data.includes("successful")) {
          setMessage("Login successful!");
          setIsError(false);
          setTimeout(() => setLoggedInUser({ email }), 800);
        } else {
          setMessage("Invalid email or password!");
          setIsError(true);
        }
      })
      .catch((err) => {
        setMessage("Login failed. Server might be down.");
        setIsError(true);
      });
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 15px",
    marginBottom: "15px",
    background: "rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border 0.2s ease",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.4)",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "rgba(20, 20, 20, 0.85)",
          backdropFilter: "blur(15px)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          width: "100%",
          maxWidth: "380px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "15px",
          }}
        >
          <span style={{ fontSize: "2rem" }}>🍵</span>
          <h1
            style={{
              margin: 0,
              color: "#ffb6b9",
              fontSize: "2.2rem",
              fontWeight: "800",
              letterSpacing: "2px",
              textShadow: "0 0 15px rgba(255, 182, 185, 0.6)",
            }}
          >
            Mellow
          </h1>
        </div>

        <p
          style={{
            color: "#ccc",
            fontSize: "0.9rem",
            marginBottom: "25px",
            textAlign: "center",
          }}
        >
          Welcome back. Ready to focus?
        </p>

        {message && (
          <div
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "8px",
              background: isError
                ? "rgba(255, 107, 107, 0.1)"
                : "rgba(78, 205, 196, 0.1)",
              border: `1px solid ${
                isError
                  ? "rgba(255, 107, 107, 0.3)"
                  : "rgba(78, 205, 196, 0.3)"
              }`,
              color: isError ? "#ff6b6b" : "#4ecdc4",
              fontSize: "0.85rem",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
            onFocus={(e) => (e.target.style.border = "1px solid #ffb6b9")}
            onBlur={(e) =>
              (e.target.style.border = "1px solid rgba(255, 255, 255, 0.1)")
            }
          />

          <div style={{ position: "relative", width: "100%", marginBottom: "15px" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...inputStyle, marginBottom: "0px", paddingRight: "45px" }}
              required
              onFocus={(e) => (e.target.style.border = "1px solid #ffb6b9")}
              onBlur={(e) =>
                (e.target.style.border = "1px solid rgba(255, 255, 255, 0.1)")
              }
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                opacity: 0.7,
                userSelect: "none",
                fontSize: "1.1rem",
              }}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#4ecdc4",
              color: "#1a1a1a",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
              transition: "background 0.2s ease, transform 0.1s ease",
            }}
            onMouseOver={(e) => (e.target.style.background = "#45b8b0")}
            onMouseOut={(e) => (e.target.style.background = "#4ecdc4")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
          >
            LOGIN
          </button>
        </form>

        <div
          style={{
            marginTop: "25px",
            fontSize: "0.85rem",
            color: "#888",
            display: "flex",
            gap: "15px",
          }}
        >
          <span
            style={{ cursor: "pointer", transition: "color 0.2s" }}
            onMouseOver={(e) => (e.target.style.color = "#ffb6b9")}
            onMouseOut={(e) => (e.target.style.color = "#888")}
          >
            Forgot Password?
          </span>
          <span>•</span>
          <span
            onClick={onNavigateToSignUp}
            style={{ cursor: "pointer", color: "#ffb6b9", fontWeight: "bold" }}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;