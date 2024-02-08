import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ncNewsGet from "../api/APIUtils";
import { useNavigate } from "react-router-dom";
import { LocationContext } from "../contexts/LocationContext";

export default function Header() {
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [topics, setTopics] = useState([]);
  const [err, setErr] = useState(null);
  const open = Boolean(anchorEl);
  const { location } = useContext(LocationContext);
  const navigate = useNavigate();
  const ITEM_HEIGHT = 48;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNav = (event) => {
    const url =
      event.target.innerText === "home"
        ? ""
        : "topic/" + event.target.innerText;
    navigate(`/${url}`);
    setAnchorEl(null);
  };
  useEffect(() => {
    ncNewsGet("/topics")
      .then(({ data: { topics } }) => {
        setTopics([{ slug: "home" }, ...topics]);
      })
      .catch(() => {
        setErr("Something went wrong, please try refreshing the page.");
      });
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            NC NEWS
          </Typography>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <Button
              color="inherit"
              endIcon={<KeyboardArrowDownIcon />}
              startIcon={<KeyboardArrowRightIcon />}
              size="medium"
              aria-label="menu"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {location ? location : "home"}
            </Button>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{
                maxHeight: ITEM_HEIGHT * 8,
              }}
            >
              {err ? (
                <MenuItem dense={true} sx={{ whiteSpace: "normal" }}>
                  {err}
                </MenuItem>
              ) : (
                topics.map((topic) => (
                  <MenuItem
                    dense={true}
                    sx={{ width: "25ch" }}
                    key={topic.slug}
                    selected={topic.slug === location}
                    onClick={handleNav}
                  >
                    {topic.slug}
                  </MenuItem>
                ))
              )}
              {}
            </Menu>
          </Typography>
          <Button color="inherit">{user ? user.username : "Login"}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
