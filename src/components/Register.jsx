import { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (name && email && password) {
      alert("Registered successfully!");
      navigate("/login"); // go to login page
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper elevation={3} sx={{ p: 4, width: 320 }}>
        <Typography variant="h5" mb={2} align="center">
          Register
        </Typography>

        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          Register
        </Button>

        <Typography mt={2} align="center">
          Already have an account?{" "}
          <Button variant="text" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Typography>
      </Paper>
    </Box>
  );
}
  