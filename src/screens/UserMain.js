import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "../App.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import EZ_Header from "../components/EZ_Header";
import { getData } from "../config/firebasemethods";
import EZ_Button from "../components/EZ_Button";
import EZ_FullScreenLoader from "../components/EZ_FullScreenLoader";
import Navbar from "../components/Navbar/Navbar";

export default function UserMain() {
  const [transportData, setTransportData] = useState([]);
  let navigate = useNavigate();

  const getTransportations = () => {
    getData("transportData")
      .then((data) => {
        console.log(data);
        setTransportData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTransportations();
  }, []);

  return (
    <>
      <Navbar
        links={[
          {
            to: "/userMain",
            label: "Bookings",
          },
          {
            to: "/profilepage",
            label: "Profile Page",
          },
        ]}
      />
      <EZ_Header heading="Book a Ride" />
      <Container maxWidth="xl">
        <Typography className="fw-bolder text-center" variant="h3" gutterBottom>
          AVAILABLE TRANSPORTS
        </Typography>

        <Box className="p-4">
          <Box>
            <Grid container spacing={2}>
              {transportData && transportData.length > 0 ? (
                transportData.map((e, i) => (
                  <Grid
                    item
                    key={i}
                    md={5}
                    style={{
                      backgroundColor: "#008E57",
                      borderRadius: "15px",
                      color: "white",
                      boxShadow:
                        "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                    }}
                    className="p-4 mx-5 my-2"
                  >
                    <Typography variant="h4" align="center">
                      {e.transportName}
                    </Typography>
                    <Box className="p-2">
                      <Typography
                        variant="h6"
                        className="text-dark fw-bolder pointer"
                        align="left"
                        style={{ cursor: "pointer" }}
                      >
                        Transportation Type:{" "}
                        {
                          <span className="text-warning fw-bold">
                            {e.transportType}
                          </span>
                        }
                      </Typography>
                      <Typography
                        variant="h6"
                        className="text-dark fw-bolder pointer"
                        align="left"
                        style={{ cursor: "pointer" }}
                      >
                        Transportation Route:{" "}
                        {
                          <span className="text-warning fw-bold">
                            {e.availableRoute}
                          </span>
                        }
                      </Typography>
                      <Typography
                        variant="h6"
                        className="text-dark fw-bolder pointer"
                        align="left"
                        style={{ cursor: "pointer" }}
                      >
                        Available Seats:{" "}
                        {
                          <span className="text-warning fw-bold">
                            {e.numberOfSeats}
                          </span>
                        }
                      </Typography>
                      <Typography
                        variant="h6"
                        className="text-dark fw-bolder pointer"
                        align="left"
                        style={{ cursor: "pointer" }}
                      >
                        Price Per Seat:{" "}
                        {
                          <span className="text-warning fw-bold">
                            Rs {e.pricePerSeat}/-
                          </span>
                        }
                      </Typography>
                      <div className="d-flex justify-content-center">
                        <EZ_Button
                          label="Book This Ride"
                          color="info"
                          padding="10px 50px"
                          onClick={() => {
                            navigate("/verifyBooking", {
                              state: e,
                            });
                          }}
                        />
                      </div>
                    </Box>
                  </Grid>
                ))
              ) : (
                <div className="d-flex justify-content-center">
                  <EZ_FullScreenLoader height="80vh" />
                </div>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
