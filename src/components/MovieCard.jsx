import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { getImageUrl } from "../services/tmdb";

export default function MovieCard({
  item,
  onClick,
  onToggleWatchlist,
  isInWatchlist,
}) {
  const title = item.title || item.name;
  const posterUrl = getImageUrl(item.poster_path, "w342");

  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": { transform: "scale(1.05)" },
        bgcolor: "#1a1a1a",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={onClick}
    >
      <Box sx={{ position: "relative" }}>
        {posterUrl ? (
          <CardMedia
            component="img"
            height="300"
            image={posterUrl}
            alt={title}
          />
        ) : (
          <Box
            sx={{
              height: 300,
              bgcolor: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary" align="center">
              {title}
            </Typography>
          </Box>
        )}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(0,0,0,0.7)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.9)" },
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWatchlist(item);
          }}
        >
          {isInWatchlist ? <Remove color="error" /> : <Add color="primary" />}
        </IconButton>
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.release_date?.substring(0, 4) ||
            item.first_air_date?.substring(0, 4) ||
            "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
}
