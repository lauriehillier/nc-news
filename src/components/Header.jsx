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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LocationContext } from "../contexts/LocationContext";
import TopicIcon from "@mui/icons-material/Topic";
import HomeIcon from "@mui/icons-material/Home";
import { Avatar, IconButton, Tooltip } from "@mui/material";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [topics, setTopics] = useState([]);
  const [err, setErr] = useState(null);
  const open = Boolean(anchorEl);
  const { location } = useContext(LocationContext);
  const navigate = useNavigate();
  const ITEM_HEIGHT = 48;
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleLogout = () => {
    setUser({});
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
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
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Box
            component="div"
            sx={{
              width: 1,
              display: "flex",
              alignItems: "center",
              maxWidth: "1440px",
              margin: "auto",
            }}
          >
            <Link to="../" className="nav-link">
              <Typography
                variant="h6"
                component="div"
                sx={{
                  ml: "20px",

                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".2rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                NC NEWS
              </Typography>
            </Link>
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
                {location}
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
                      {topic.slug === "home" ? (
                        <HomeIcon fontSize="small" sx={{ mr: 1 }} />
                      ) : (
                        <TopicIcon fontSize="small" sx={{ mr: 1 }} />
                      )}
                      {topic.slug.length > 25
                        ? topic.slug.slice(0, 22) + "..."
                        : topic.slug}
                    </MenuItem>
                  ))
                )}
                {}
              </Menu>
            </Typography>
            
              {user.username ? (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0, border: 1, borderColor: "white" }}
                    >
                      <Avatar
                        alt={`${user.username}'s avatar`}
                        src={user.avatar_url}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "35px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    MenuListProps={{ sx: { py: 0 } }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu} dense={true}>
                      <Typography textAlign="center" onClick={handleLogout}>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
               <Button color="inherit" component={Link} to="../login">Login</Button>
              )}
            
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
