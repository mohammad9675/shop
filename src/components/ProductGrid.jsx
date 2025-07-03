import { Grid, Card, CardMedia, Typography, Box } from "@mui/material";

const products = [
  {
    id: 1,
    title: "Spring Oversized Coat",
    image: "../public/images/pImage.jpeg",
  },
  {
    id: 2,
    title: "Monochrome Drape Blazer",
    image: "../public/images/pImage.jpeg",
  },
];

const cardStyles = {
  borderRadius: "0.25rem",
  boxShadow: "none",
  position: "relative",
};

const typoStyles = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
  color: "white",
  p: 2,
};

export default function ProductGrid() {
  return (
    <Grid container spacing={4} sx={{ p: 4 }}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card sx={cardStyles}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              height="300"
            />
            <Box sx={typoStyles}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {product.title}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
