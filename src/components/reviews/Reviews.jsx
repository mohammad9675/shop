import { Box, Typography, Rating } from "@mui/material";

export default function Reviews({ reviews }) {
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ mb: 2, color: "#000000", fontWeight: "bold" }}
      >
        Customer Reviews
      </Typography>
      {reviews?.length ? (
        reviews.map((review, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Typography sx={{ color: "#000000" }} variant="subtitle2">
              {review.user}
            </Typography>
            <Rating value={review.rating} readOnly size="small" />
            <Typography sx={{ color: "#000000" }} variant="body2">
              {review.comment}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2">No reviews yet.</Typography>
      )}
    </Box>
  );
}
