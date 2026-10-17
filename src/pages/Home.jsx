import { useEffect, useState } from "react";
import { Typography, Box, CircularProgress, Alert } from "@mui/material";
import {
  fetchTrending,
  fetchPopularMovies,
  fetchPopularTV,
} from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import DetailsDialog from "../components/DetailsDialog";
import { useWatchlist } from "../hooks/useWatchlist";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [trendingData, moviesData, tvData] = await Promise.all([
          fetchTrending(),
          fetchPopularMovies(),
          fetchPopularTV(),
        ]);
        setTrending(trendingData);
        setPopularMovies(moviesData);
        setPopularTV(tvData);
      } catch (err) {
        setError("Failed to load content. Please check your API key.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleToggleWatchlist = (item) => {
    const type = item.media_type || (item.title ? "movie" : "tv");
    if (isInWatchlist(item.id, type)) {
      removeFromWatchlist(item.id, type);
    } else {
      addToWatchlist({ ...item, media_type: type });
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;

  const renderRow = (title, items) => (
    <Box sx={{ mb: 5 }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: "bold", color: "#fff" }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 2,
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": { bgcolor: "#555", borderRadius: 4 },
        }}
      >
        {items.map((item) => (
          <Box
            key={`${item.id}-${item.media_type}`}
            sx={{ minWidth: 180, maxWidth: 180 }}
          >
            <MovieCard
              item={item}
              onClick={() => handleCardClick(item)}
              onToggleWatchlist={handleToggleWatchlist}
              isInWatchlist={isInWatchlist(
                item.id,
                item.media_type || (item.title ? "movie" : "tv"),
              )}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box>
      {renderRow("Trending This Week", trending)}
      {renderRow("Popular Movies", popularMovies)}
      {renderRow("Popular TV Shows", popularTV)}

      <DetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        details={selectedItem}
      />
    </Box>
  );
}
