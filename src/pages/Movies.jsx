import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../services/tmdb";
import { Box, Typography, CircularProgress } from "@mui/material";
import MovieCard from "../components/MovieCard";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularMovies().then((data) => {
      setMovies(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 10 }} />;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Popular Movies
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 2,
        }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            item={{ ...movie, media_type: "movie" }}
            onClick={() => {}}
          />
        ))}
      </Box>
    </Box>
  );
}
