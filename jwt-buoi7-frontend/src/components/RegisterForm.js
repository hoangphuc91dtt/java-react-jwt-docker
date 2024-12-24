import React, { useState } from "react";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box
} from "@mui/material";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu mật khẩu và xác nhận mật khẩu không khớp
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Gửi yêu cầu đăng ký tới backend
      const response = await authService.registerUser({
        name,
        email,
        password
      });

      // Nếu đăng ký thành công, hiển thị thông báo và chuyển hướng tới trang đăng nhập
      setMessage(response);
      navigate("/login");
    } catch (err) {
      // Kiểm tra xem lỗi có phải do email đã tồn tại không
      if (err.response && err.response.status === 400) {
        setError(err.response.data); // Hiển thị thông báo lỗi từ backend
      } else {
        setError("Registration failed"); // Nếu có lỗi khác, hiển thị thông báo chung
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "30px", marginTop: "60px" }}>
        <Typography
          variant="h5"
          align="center"
          color="primary"
          style={{ marginBottom: "20px" }}
        >
          Create an Account
        </Typography>
        {message && (
          <Typography color="success" align="center" variant="body2">
            {message}
          </Typography>
        )}
        {error && (
          <Typography color="error" align="center" variant="body2">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} noValidate>
          <Box mb={2}>
            <TextField
              margin="normal"
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <TextField
              margin="normal"
              fullWidth
              type="email"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="outlined"
            />
          </Box>
          <Box mb={2}>
            <TextField
              margin="normal"
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="outlined"
            />
          </Box>
          <Box mb={3}>
            <TextField
              margin="normal"
              fullWidth
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              variant="outlined"
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Register
          </Button>

          <Grid container justifyContent="center" style={{ marginTop: "15px" }}>
            <Grid item>
              <Button onClick={() => navigate("/login")} variant="text">
                Already have an account? Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
