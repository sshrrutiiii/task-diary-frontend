import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Alert, Box } from "@mui/material";

function Register({ setLoggedInUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    axios.post("http://localhost:8080/api/users/register", { name, email, password })
      .then(res => {
        setMessage("User registered successfully!");
        setLoggedInUser(res.data); // store logged-in user
        setName(""); setEmail(""); setPassword("");
      })
      .catch(err => setMessage(err.response?.data || "Registration failed"));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>Register</Typography>
      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth />
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
        <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth />
        <Button variant="contained" onClick={handleRegister}>Register</Button>
      </Box>
    </Container>
  );
}

export default Register;