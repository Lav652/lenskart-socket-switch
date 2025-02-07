import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, Button, Typography, Container, Paper, Switch, Box } from "@mui/material";
import SearchIcon from "../assets/images/searchIcon.svg";
import { styled } from "@mui/system";
import axios from "axios";
import { motion } from "framer-motion";
import {io} from "socket.io-client"

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
  },
}));

const MainPage = () => {
  const [switchbtn, setSwitchbtn] = useState(false);

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io("https://lk-ims-backend-production.up.railway.app");

    // Listen for updates from the backend
    socket.on("led-state-update", (payload) => {
        console.log("Received state update:", payload);
        setSwitchbtn(payload.toLowerCase() === "on");
    });

    // Clean up the socket connection on unmount
    return () => {
        socket.disconnect();
    };
}, []);


  const onBtnClick = async (changeValue) => {
    try {
      const response = await axios.post(`https://lk-ims-backend-production.up.railway.app/api/mqtt/publish-mqtt`, {
        payload: changeValue,
      });
      if (response.status === 200) {
        console.log("Successfully toggled switch.");
      }
    } catch (error) {
      window.alert("Error in turning on the bulb");
      setSwitchbtn(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          marginTop: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              color: "#333",
            }}
          >
            Store Control Panel
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            id="outlined-start-adornment"
            placeholder="Enter Store Id"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={SearchIcon} alt="Search Icon" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            sx={{
              height: "55px",
              width: "100%",
              background: "#333",
              color: "#fff",
              "&:hover": {
                background: "#555",
              },
              transition: "background 0.3s",
            }}
            variant="contained"
          >
            Search
          </Button>
        </Box>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 3,
            marginTop: 4,
          }}
        >
          {switchbtn ? (
            <motion.img
              src="https://www.w3schools.com/js/pic_bulbon.gif"
              alt="Bulb On"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.img
              src="https://www.w3schools.com/js/pic_bulboff.gif"
              alt="Bulb Off"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          <Typography
            variant="body1"
            sx={{
              color: "#333",
              fontWeight: "bold",
            }}
          >
            {switchbtn ? "ON" : "OFF"}
          </Typography>
          <Box mt={4} display="flex" justifyContent="center" flexDirection="row" width="100%" gap={2}>
            <Button
              variant={switchbtn ? "contained" : "outlined"}
              sx={{
                background: switchbtn ? "#333" : "transparent",
                color: switchbtn ? "#fff" : "#333",
                borderColor: "#333",
                "&:hover": {
                  background: switchbtn ? "#555" : "#f0f0f0",
                },
                transition: "background 0.3s",
              }}
              onClick={() => {
                onBtnClick(true);
                setSwitchbtn(true);
              }}
            >
              ON
            </Button>
            <Button
              variant={!switchbtn ? "contained" : "outlined"}
              sx={{
                background: !switchbtn ? "#333" : "transparent",
                color: !switchbtn ? "#fff" : "#333",
                borderColor: "#333",
                "&:hover": {
                  background: !switchbtn ? "#555" : "#f0f0f0",
                },
                transition: "background 0.3s",
              }}
              onClick={() => {
                onBtnClick(false);
                setSwitchbtn(false);
              }}
            >
              OFF
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default MainPage;
