import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const navBarStyles = {
  backgroundColor: "black",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  py: 2,
  px: 2,
};

const linksContainerStyles = {
  display: "flex",
  gap: 4,
  alignItems: "center",
};

const linkStyles = {
  fontSize: "0.75rem",
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
  "Health and Beauty",
  "Cultural Products",
  "Gift",
  "Designers",
];

export default function MainNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // <960px

  return (
    <Box sx={navBarStyles}>
      <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
        TheShop
      </Typography>

      {isMobile ? (
        <>
          <IconButton
            sx={{ color: "white" }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box
              sx={{
                width: 250,
                bgcolor: "black",
                height: "100%",
                color: "white",
              }}
              role="presentation"
              onClick={() => setDrawerOpen(false)}
            >
              <List>
                {navLinks.map((text) => (
                  <ListItem button key={text}>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        </>
      ) : (
        <Box sx={linksContainerStyles}>
          {navLinks.map((text) => (
            <Typography key={text} sx={linkStyles}>
              {text}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}
