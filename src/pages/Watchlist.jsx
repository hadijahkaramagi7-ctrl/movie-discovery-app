import { Box, Typography, Grid } from "@mui/material";
import { useWatchlist } from "../hooks/useWatchlist";
import MovieCard from "../components/MovieCard";

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        My Watchlist
      </Typography>
      {watchlist.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Your watchlist is empty. Add some movies!
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 2,
          }}
        >
          {watchlist.map((item) => (
            <MovieCard
              key={`${item.id}-${item.media_type}`}
              item={item}
              onClick={() => {}}
              onToggleWatchlist={() =>
                removeFromWatchlist(item.id, item.media_type)
              }
              isInWatchlist={true}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
