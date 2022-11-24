import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EZ_Alert from "../components/EZ_Alert";
import EZ_Button from "../components/EZ_Button";
import EZ_Header from "../components/EZ_Header";
import { sendData } from "../config/firebasemethods";
import { setDate, setTime } from "../core/helpermethods";

export default function VerifyBooking() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [model, setModel] = useState({
    ...location.state,
    bookingDate: setDate(new Date()),
    bookingTime: setTime(new Date()),
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const navigate = useNavigate();

  const sendBookingData = () => {
    setLoading(true);
    sendData(model, "bookings")
      .then((success) => {
        setLoading(false);
        console.log(success);
        setAlertMessage("BOOKING SUCCESSFUL");
        setTimeout(() => {
          navigate("/userMain");
        }, 300);
        setTimeout(() => {
          setAlertMessage("");
          setSeverity("");
        }, 3000);
        setSeverity("success");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setAlertMessage(err);
        setSeverity("error");
        setTimeout(() => {
          setAlertMessage("");
          setSeverity("");
        }, 3000);
      });
  };

  useEffect(() => {
    console.log(location.state);
  });

  return (
    <>
      <EZ_Header heading="Verify Your Booking" />
      <Container maxWidth="lg">
        <Grid container>
          <Grid item md={12} sm={12} xs={12}>
            <Typography
              style={{ margin: "23px", color: "#222", fontWeight: "bolder" }}
              variant="h2"
              align="center"
            >
              TRANSPORT NAME:{" "}
              {
                <span style={{ color: "#00804E" }}>
                  {location.state.transportName}
                </span>
              }
            </Typography>
            <Box className="p-2">
              <Typography
                variant="h3"
                className="text-dark fw-bolder pointer"
                align="left"
                style={{ margin: "23px " }}
              >
                Transportation Type:{" "}
                {
                  <span className="text-warning fw-bold">
                    {location.state.transportType}
                  </span>
                }
              </Typography>
              <Typography
                variant="h3"
                className="text-dark fw-bolder pointer"
                align="left"
                style={{ margin: "23px" }}
              >
                Transportation Route:{" "}
                {
                  <span className="text-warning fw-bold">
                    {location.state.availableRoute}
                  </span>
                }
              </Typography>
              <Typography
                variant="h3"
                className="text-dark fw-bolder pointer"
                align="left"
                style={{ margin: "23px" }}
              >
                Available Seats:{" "}
                {
                  <span className="text-warning fw-bold">
                    {location.state.numberOfSeats}
                  </span>
                }
              </Typography>
              <Typography
                variant="h3"
                className="text-dark fw-bolder pointer"
                align="left"
                style={{ margin: "23px" }}
              >
                Price Per Seat:{" "}
                {
                  <span className="text-warning fw-bold">
                    Rs {location.state.pricePerSeat}/-
                  </span>
                }
              </Typography>
              <Typography
                variant="h2"
                className="text-dark fw-bolder pointer"
                align="left"
                style={{ margin: "23px" }}
              >
                Your Total:{" "}
                {
                  <span className="text-secondary fw-bold">
                    Rs{" "}
                    {location.state.pricePerSeat * location.state.numberOfSeats}
                    /-
                  </span>
                }
              </Typography>
              <Grid
                className="d-flex justify-content-center"
                item
                md={12}
                sm={12}
                xs={12}
              >
                <EZ_Button
                  padding="10px 70px"
                  isLoading={loading}
                  color="secondary"
                  label="PROCEED TO PAYMENT"
                  onClick={() => {
                    sendBookingData();
                  }}
                />
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <EZ_Alert alertMessage={alertMessage} severity={severity} />
      </Container>
    </>
  );
}
