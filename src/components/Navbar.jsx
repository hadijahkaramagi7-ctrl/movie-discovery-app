import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import { Search as SearchIcon, Movie as MovieIcon } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#1a1a1a" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <MovieIcon sx={{ color: "primary.main", mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            MovieBox
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            size="small"
            placeholder="Search movies, TV shows..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              bgcolor: "#333",
              borderRadius: 1,
              input: { color: "white" },
              width: { xs: "150px", sm: "250px" },
            }}
          />
          <IconButton type="submit" sx={{ ml: 1, color: "white" }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
