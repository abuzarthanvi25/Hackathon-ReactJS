import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

import EZ_Header from "../components/EZ_Header";
import { checkUser, getData, logoutUser } from "../config/firebasemethods";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EZ_Button from "../components/EZ_Button";
import EZ_FullScreenLoader from "../components/EZ_FullScreenLoader";
import { Box } from "@mui/system";
import Navbar from "../components/Navbar/Navbar";

export default function ProfilePage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);
  const [bookingData, setBookingData] = useState([]);

  const getProfileData = () => {
    getData("users").then((data) => {
      data = data.filter((user) => user.category === "user");
      setUsers(data);
      // let arr = users.filter((user) => user.category === "user");
      setCurrentUser([...data]);
    });
  };

  let isUser = () => {
    checkUser()
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
        // alert(error);
        navigate("/");
      });
  };

  let getBookings = () => {
    getData("bookings")
      .then((data) => {
        console.log(data);
        setBookingData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProfileData();
    // isUser();
    getBookings();
    console.log(currentUser);
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
      <div className="vh-auto" style={{ backgroundColor: "#9de2ff" }}>
        <MDBContainer>
          <MDBRow className="justify-content-center">
            <EZ_Header heading="Profile Page" />
            <div className="d-flex justify-content-end">
              <EZ_Button
                label="LOGOUT"
                padding="10px 40px"
                onClick={() => {
                  logoutUser()
                    .then((success) => {
                      alert(success);
                      navigate("/");
                    })
                    .catch((error) => {
                      alert(error);
                    });
                }}
                color="error"
              />
            </div>
            <MDBCol md="9" lg="7" xl="5" className="mt-5">
              <MDBCard style={{ borderRadius: "15px" }}>
                <MDBCardBody className="p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      <MDBCardImage
                        style={{
                          width: "180px",
                          borderRadius: "10px",
                          height: "200px",
                        }}
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                        alt="Generic placeholder image"
                        fluid
                      />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      {currentUser && currentUser.length > 0 ? (
                        currentUser.map((e, i) => (
                          <>
                            <MDBCardTitle>Username</MDBCardTitle>
                            <MDBCardText
                              style={{ color: "#00597F", fontSize: "18px" }}
                            >
                              {e.userName}
                            </MDBCardText>
                            <MDBCardTitle>Email</MDBCardTitle>
                            <MDBCardText
                              style={{ color: "#00597F", fontSize: "18px" }}
                            >
                              {e.email}
                            </MDBCardText>
                            <MDBCardTitle>Contact</MDBCardTitle>
                            <MDBCardText
                              style={{ color: "#00597F", fontSize: "18px" }}
                            >
                              {e.contact}
                            </MDBCardText>{" "}
                          </>
                        ))
                      ) : (
                        <div className="d-flex justify-content-center mt-5 pt-4">
                          <CircularProgress color="warning" />
                        </div>
                      )}
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <Typography
            className="mt-5"
            variant="h4"
            gutterBottom
            color="warning"
            style={{ fontWeight: "bolder", textAlign: "center" }}
          >
            BOOKINGS
          </Typography>
          <Grid container className="mt-5" spacing={2}>
            {bookingData && bookingData.length > 0 ? (
              bookingData.map((e, i) => (
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
                      Booking Date:{" "}
                      {
                        <span className="text-warning fw-bold">
                          {e.bookingDate}
                        </span>
                      }
                    </Typography>
                    <Typography
                      variant="h6"
                      className="text-dark fw-bolder pointer"
                      align="left"
                      style={{ cursor: "pointer" }}
                    >
                      Booking Time:{" "}
                      {
                        <span className="text-warning fw-bold">
                          {e.bookingTime}
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
                  </Box>
                </Grid>
              ))
            ) : (
              <div className="d-flex justify-content-center">
                <EZ_FullScreenLoader height="80vh" />
              </div>
            )}
          </Grid>
        </MDBContainer>
      </div>
    </>
  );
}
