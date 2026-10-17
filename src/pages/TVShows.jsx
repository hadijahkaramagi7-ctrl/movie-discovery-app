import { useEffect, useState } from "react";
import { fetchPopularTV } from "../services/tmdb";
import { Box, Typography, CircularProgress } from "@mui/material";
import MovieCard from "../components/MovieCard";

export default function TVShows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularTV().then((data) => {
      setShows(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 10 }} />;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Popular TV Shows
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 2,
        }}
      >
        {shows.map((show) => (
          <MovieCard
            key={show.id}
            item={{ ...show, media_type: "tv" }}
            onClick={() => {}}
          />
        ))}
      </Box>
    </Box>
  );
}
