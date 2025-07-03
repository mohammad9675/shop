import {
  Box,
  TextField,
  IconButton,
  Badge,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const topBarStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  px: 4,
  backgroundColor: "white",
};

const searchBoxStyles = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  flex: 1,
};

const logoStyles = {
  flex: 1,
  textAlign: "center",
};

const iconsStyles = {
  display: "flex",
  gap: 2,
  flex: 1,
  justifyContent: "flex-end",
};

export default function TopBar() {
  return (
    <Box sx={topBarStyles}>
      <Box sx={searchBoxStyles}>
        <TextField
          placeholder="Search store"
          fullWidth
          variant="standard"
          slotProps={{
            input: {
              disableUnderline: false,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                color: "black",
              },
            },
          }}
        />
      </Box>

      <Box sx={logoStyles}>
        <img src="/images/logo.png" alt="Logo" height={60} />
      </Box>

      <Box sx={iconsStyles}>
        <IconButton>
          <Badge badgeContent={1} color="primary">
            <ShoppingBagIcon />
          </Badge>
        </IconButton>
        <IconButton>
          <PersonIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
