// import { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
// import axios from "axios";

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
export default function ProductGrid() {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("../data/products.json") // local file for now
  //     .then((res) => setProducts(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <Grid container spacing={4} sx={{ p: 4 }}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card sx={{ borderRadius: 2 }}>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              height="300"
            />
            <CardContent>
              <Typography variant="h6">{product.title}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
