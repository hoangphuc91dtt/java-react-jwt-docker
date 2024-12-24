import React, { useEffect, useState } from "react";
import { userService } from "../services/userService";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Alert
} from "@mui/material";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized");

        const userData = await userService.getUserProfile(token);
        setUserInfo(userData);
      } catch (err) {
        setError("Error fetching user profile");
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!userInfo) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress /> {/* Hiển thị loading spinner */}
        </Box>
      </Container>
    );
  }

  // Xử lý hiển thị roles nếu roles không phải mảng
  const rolesDisplay = Array.isArray(userInfo.roles)
    ? userInfo.roles.join(", ")
    : "N/A";

  return (
    <Container maxWidth="md" style={{ marginTop: "30px" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            User Details
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Username: <strong>{userInfo.name}</strong>
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Email: <strong>{userInfo.email}</strong>
          </Typography>
          {/* <Typography variant="subtitle1" color="textSecondary">
            Roles: <strong>{userInfo.roles}</strong>
          </Typography> */}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => (window.location.href = "/home")}
            fullWidth
          >
            Back to Home
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default UserProfile;
