import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  CssBaseline,
  Container,
  Box,
  Paper,
  Typography
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const Home = () => {
  const handleNavigate = (path) => {
    window.location.href = path;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <CssBaseline />
      {/* Thanh AppBar - Navigation */}
      <AppBar position="sticky" color="primary">
        <Toolbar>
          {/* Chuyển menu sang bên trái bằng cách sử dụng flex */}
          <Box style={{ display: "flex", flexGrow: 1 }}>
            <Button color="inherit" onClick={() => handleNavigate("/home")}>
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => handleNavigate("/userProfile")}
            >
              User Details
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" style={{ marginTop: "50px" }}>
        <Box mb={4} textAlign="center">
          <Typography variant="h4" color={blueGrey[800]} gutterBottom>
            Welcome to Simple Platform
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Explore the features or log out securely.
          </Typography>
        </Box>

        {/* Tạo các nút chức năng */}
        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
          <Box textAlign="center">
            <Typography variant="h6" color={blueGrey[700]} gutterBottom>
              User Details
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              View and manage your personal information.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => handleNavigate("/userProfile")}
            >
              View Profile
            </Button>
          </Box>
        </Paper>

        <Paper elevation={3} style={{ padding: "20px" }}>
          <Box textAlign="center">
            <Typography variant="h6" color={blueGrey[700]} gutterBottom>
              Logout
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Securely log out of your account.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Home;
