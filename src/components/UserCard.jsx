import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export default function UserCard({ displayUser }) {
  const { user, setUser } = useContext(UserContext);
  const handleLogout = () => {
    setUser({});
  };
  const handleLogin = () => {
    setUser(displayUser);
  };
  console.log(user);
  return (
    <Card
      sx={{
        maxWidth: 1280,
        display: "flex",
        justifyContent: "center",
        width: 1,
        alignItems: "center",
        marginTop: 1,
        maxWidth: "600px",
        ml: "auto",
        mr: "auto",
        padding: 1,
        "&:last-child": {
          paddingBottom: 0.5,
        },
      }}
    >
      <Avatar
        alt={`${displayUser.username}'s avatar`}
        src={displayUser.avatar_url}
      />

      <Box component="div" sx={{ flexGrow: 1, textAlign: "left", ml: 1 }}>
        {displayUser.username}
      </Box>

      {user.username === displayUser.username ? (
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      )}
    </Card>
  );
}
