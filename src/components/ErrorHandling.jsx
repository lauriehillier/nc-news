import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { LocationContext } from "../contexts/LocationContext";
import { useContext, useEffect } from "react";

export default function ErrorHandling({ code, msg }) {
  const { setLocation } = useContext(LocationContext);
  useEffect(() => {
    setLocation("home");
  }, []);
  return (
    <Paper
      elevation={1}
      sx={{ maxWidth: 800, width: 1, marginTop: 1 }}
    >
      <Box
        component="div"
        sx={{
          my: 0.5,
          marginLeft: "auto",
          marginRight: "auto", padding: 2
        }}
      >
        <Typography variant="h2" fontWeight={"bold"}>
          {code}
        </Typography>
        <Typography variant="h6">Oops!</Typography>
        <Typography variant="body1">
          {msg ? msg : "The page you're looking for doesn't seem to exist."}
        </Typography>
        <Link to="../">
          <Button sx={{ marginTop: 2 }} variant="contained">
            back home
          </Button>
        </Link>
      </Box>
    </Paper>
  );
}
