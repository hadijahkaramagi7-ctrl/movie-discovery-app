import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Typography, Box, CircularProgress, Alert } from "@mui/material";
import { searchMulti } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import DetailsDialog from "../components/DetailsDialog";
import { useWatchlist } from "../hooks/useWatchlist";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    if (!query) return;
    const search = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await searchMulti(query);
        setResults(data);
      } catch (err) {
        setError("Failed to search. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    search();
  }, [query]);

  const handleToggleWatchlist = (item) => {
    const type = item.media_type || (item.title ? "movie" : "tv");
    if (isInWatchlist(item.id, type)) removeFromWatchlist(item.id, type);
    else addToWatchlist({ ...item, media_type: type });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Search Results for "{query}"
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && results.length === 0 && (
        <Typography>No results found.</Typography>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 2,
        }}
      >
        {results.map((item) => (
          <MovieCard
            key={item.id}
            item={item}
            onClick={() => {
              setSelectedItem(item);
              setDialogOpen(true);
            }}
            onToggleWatchlist={handleToggleWatchlist}
            isInWatchlist={isInWatchlist(
              item.id,
              item.media_type || (item.title ? "movie" : "tv"),
            )}
          />
        ))}
      </Box>

      <DetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        details={selectedItem}
      />
    </Box>
  );
}
