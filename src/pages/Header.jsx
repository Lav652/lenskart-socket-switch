import { Box, Paper, Typography } from "@mui/material";
import { memo } from "react";

const headerStyle = (theme) => ({
  width: "100%",
  background: "#020043",
  position: "sticky",
  top: "0px",
  display: "flex",
  alignItems: "center",
  pt: 1,
  pb: 2,
  height: "auto",
  color: "#fff",
  zIndex: 11,
  borderBottom: "1px solid #e0e0e0",
});

const Header = () => {
  return (
    <Box elevation={0} sx={headerStyle}>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Typography variant="h4" sx={{ ml: 2, fontWeight: "bold" }}>
          Lenskart Hardware Project
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(Header);
