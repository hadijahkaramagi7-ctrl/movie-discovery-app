import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getImageUrl } from "../services/tmdb";

export default function DetailsDialog({ open, onClose, details }) {
  if (!details) return null;

  const title = details.title || details.name;
  const overview = details.overview || "No overview available.";
  const rating = details.vote_average ? details.vote_average.toFixed(1) : "N/A";
  const releaseDate = details.release_date || details.first_air_date || "N/A";
  const posterUrl = getImageUrl(details.poster_path, "w500");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { bgcolor: "#1a1a1a", backgroundImage: "none" } }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "grey.500" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: "#333" }}>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {posterUrl && (
            <img
              src={posterUrl}
              alt={title}
              style={{
                width: "100%",
                maxWidth: "250px",
                borderRadius: 8,
                objectFit: "cover",
              }}
            />
          )}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Typography variant="h6" color="primary">
                ⭐ {rating} / 10
              </Typography>
              <Typography variant="h6" color="text.secondary">
                |
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {releaseDate}
              </Typography>
            </Box>

            <Box sx={{ my: 2 }}>
              {details.genres?.map((g) => (
                <Chip
                  key={g.id}
                  label={g.name}
                  size="small"
                  sx={{ mr: 1, mb: 1, bgcolor: "#333" }}
                />
              ))}
            </Box>

            <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: "bold" }}>
              Overview
            </Typography>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.6, color: "text.secondary" }}
            >
              {overview}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
