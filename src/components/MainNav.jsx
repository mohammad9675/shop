import { Box, Typography } from "@mui/material";

const navBarStyles = {
  backgroundColor: "black",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 4,
  py: 2,
  px: 2,
};

const linkStyles = {
  fontSize: "0.95rem",
  cursor: "pointer",
  transition: "color 0.2s",
  "&:hover": {
    color: "#FF6B6B",
  },
};

const navLinks = [
  "Special Offers",
  "New products",
  "Fashion",
  "Home Appliance and Décor",
  "Aart Maart",
  "Health and Beauty",
  "Food",
  "Cultural Products",
  "Gift",
  "Designers",
  "Blog",
];

export default function MainNav() {
  return (
    <Box sx={navBarStyles}>
      {navLinks.map((text) => (
        <Typography key={text} sx={linkStyles}>
          {text}
        </Typography>
      ))}
    </Box>
  );
}
