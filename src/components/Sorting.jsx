import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Sorting({ order, sort }) {
  const [anchorEl, setAnchorEl] = useState(null);
  let [searchParams, setSearchParams] = useSearchParams();
  const sortString = {
    created_at: "date",
    comment_count: "comments",
    votes: "votes",
  };
  const open = Boolean(anchorEl);
  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortClose = () => {
    setAnchorEl(null);
  };
  const handleSortSelect = (option) => {
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      sort: sortString[option],
    });
    setAnchorEl(null);
  };
  const handleOrderClick = () => {
    if (!order || order === "desc") {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        order: "asc",
      });
    } else {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        order: "desc",
      });
    }
  };

  return (
    <>
      <Paper elevation={1} sx={{ maxWidth: 800, width: 1, marginTop: 1 }}>
        <Box
          component="div"
          sx={{
            my: 0.5,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Button
            id="sort-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleSortClick}
          >
            Sort By: {sortString[sort] || "date"}
            <KeyboardArrowDownIcon sx={{ marginBottom: "2px" }} />
          </Button>
          <Menu
            id="basic-menu"
            sx={{ ml: "30px" }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleSortClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              dense={true}
              onClick={() => {
                handleSortSelect("created_at");
              }}
              selected={!sort || sort === "created_at"}
            >
              Date
            </MenuItem>
            <MenuItem
              dense={true}
              onClick={() => {
                handleSortSelect("comment_count");
              }}
              selected={sort === "comment_count"}
            >
              Comment Count
            </MenuItem>
            <MenuItem
              dense={true}
              onClick={() => {
                handleSortSelect("votes");
              }}
              selected={sort === "votes"}
            >
              Votes
            </MenuItem>
          </Menu>
          <Button id="order-button" onClick={handleOrderClick}>
            Order By: {order === "asc" ? "asc" : "desc"}
            {order === "asc" ? (
              <NorthIcon fontSize="smaller" sx={{ marginBottom: "2px" }} />
            ) : (
              <SouthIcon fontSize="smaller" sx={{ marginBottom: "2px" }} />
            )}
          </Button>
        </Box>
      </Paper>
    </>
  );
}
