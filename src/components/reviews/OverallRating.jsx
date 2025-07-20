import { Box, Typography, Rating } from "@mui/material";

export default function OverallRating({ reviews }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
      <Rating
        value={
          reviews?.length > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length
            : 0
        }
        readOnly
        precision={0.1}
        size="small"
        sx={{
          "& .MuiRating-iconFilled": {
            color: "#666", // Grey color for filled stars
          },
          "& .MuiRating-iconEmpty": {
            color: "#e0e0e0", // Light grey for empty stars
          },
        }}
      />
      <Typography variant="body2" sx={{ color: "#666" }}>
        {reviews?.length > 0
          ? (
              reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length
            ).toFixed(1)
          : "0.0"}{" "}
        ({reviews?.length || 0})
      </Typography>
    </Box>
  );
}
