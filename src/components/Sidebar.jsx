import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Home, Movie, Tv, Bookmark } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { text: "Home", icon: <Home />, path: "/" },
  { text: "Movies", icon: <Movie />, path: "/movies" },
  { text: "TV Shows", icon: <Tv />, path: "/tv" },
  { text: "My Watchlist", icon: <Bookmark />, path: "/watchlist" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 250,
        bgcolor: "#0f0f0f",
        borderRight: "1px solid #333",
        display: { xs: "none", md: "block" },
      }}
    >
      <Typography
        variant="h5"
        sx={{ p: 3, color: "primary.main", fontWeight: "bold" }}
      >
        Menu
      </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  bgcolor: "rgba(229, 9, 20, 0.2)",
                  borderRight: "3px solid #e50914",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.path
                      ? "primary.main"
                      : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
