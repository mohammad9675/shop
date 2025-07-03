import { Box, Typography } from "@mui/material";

const bodyStyles = {
  height: "65%",
  backgroundImage: `url('../public/images/hero.webp')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  textAlign: "center",
};

export default function Hero() {
  return (
    <Box sx={bodyStyles}>
      <Typography variant="h2" sx={{ fontWeight: "bold" }}>
        Your Next Look
      </Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Designed for expression.
      </Typography>
    </Box>
  );
}
