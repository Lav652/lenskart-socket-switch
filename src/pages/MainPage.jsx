import React from "react";
import { TextField, InputAdornment, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "../assets/images/searchIcon.svg";
import { styled } from "@mui/system";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import EmojiObjectsRoundedIcon from "@mui/icons-material/EmojiObjectsRounded";
import { useState } from "react";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 80,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(55px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
        ...theme.applyStyles("dark", {
          backgroundColor: "#2ECA45",
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },

    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...theme.applyStyles("dark", {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    ...theme.applyStyles("dark", {
      backgroundColor: "#39393D",
    }),
  },
}));

const MainPage = () => {
  const [switchbtn, setSwitchbtn] = useState(false);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          m: 2,
          flexDirection: "row",
          gap: 2,
        }}
      >
        <TextField
          sx={{ width: "60%" }}
          id="outlined-start-adornment"
          // onChange={(e) => {
          //   setFilters({ ...filters, search: e.target.value });
          // }}
          placeholder="Enter Id..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <img src={SearchIcon} />
                </InputAdornment>
              ),
            },
          }}
        />
        <Button sx={{ height: "55px", width: "10%" }} variant="contained">
          Search
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {switchbtn ? (
          <img src="https://www.w3schools.com/js/pic_bulbon.gif" />
        ) : (
          <img src="https://www.w3schools.com/js/pic_bulboff.gif " />
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {" "}
          <Typography variant="body" sx={{ color: "black", fontWeight: "bold" }}>
            {switchbtn ? "ON" : "OFF"}
          </Typography>
          <FormControlLabel
            value={switchbtn}
            sx={{ marginLeft: "10px" }}
            onChange={(e, changeValue) => {
              setSwitchbtn(changeValue);
            }}
            control={<IOSSwitch />}
            label=""
          />{" "}
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
