import React, { useState } from "react";
import axios from "axios";

function SignUp({ onNavigateToLogin, setLoggedInUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
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

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setIsError(true);
      return;
    }

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

  return (
    <div className={`app-container ${localStorage.getItem("isDarkMode") === "true" ? "dark-mode" : ""}`}>
      <div style={{ maxWidth: "380px", margin: "auto", padding: "40px" }}>

        <h1 style={{ color: "#ffb6b9" }}>🍵 Mellow</h1>

        {message && <p style={{ color: isError ? "red" : "green" }}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "SIGN UP"}
          </button>
        </form>

        <p onClick={onNavigateToLogin} style={{ cursor: "pointer" }}>
          Login
        </p>
      </div>
    </div>
  );
}

export default SignUp;