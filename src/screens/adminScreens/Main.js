import { Grid, InputAdornment } from "@mui/material";
import { Container } from "@mui/system";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EZ_Alert from "../../components/EZ_Alert";
import EZ_Button from "../../components/EZ_Button";
import EZ_Dropdown from "../../components/EZ_Dropdown";
import EZ_FullScreenLoader from "../../components/EZ_FullScreenLoader";
import EZ_Header from "../../components/EZ_Header";
import EZ_Input from "../../components/EZ_Input";
import EZ_Switch from "../../components/EZ_Switch";
import EZ_Table from "../../components/EZ_Table";
import { checkUser, getData, sendData } from "../../config/firebasemethods";

export default function TransportForm() {
  const [model, setModel] = useState({});
  const [transportList, setTransportList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");

  let navigate = useNavigate();

  let isUser = () => {
    checkUser()
      .then((success) => {
        console.log(success);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        navigate("/");
      });
  };
  let sendTransportData = (data, node) => {
    setLoading(true);
    sendData(data, node)
      .then((success) => {
        setLoading(false);
        setAlertMessage(success);
        setTimeout(() => {
          setAlertMessage("");
          setSeverity("");
        }, 3000);
        setSeverity("success");
        console.log(success);
      })
      .catch((err) => {
        setLoading(false);
        setAlertMessage(err);
        setSeverity("error");
        setTimeout(() => {
          setAlertMessage("");
          setSeverity("");
        }, 3000);
        console.log(err);
        setError(err);
      });
  };

  let getTransportData = () => {
    getData("transportData")
      .then((data) => {
        console.log(data);
        setTransportList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    isUser();
    console.log(model);
    getTransportData();
  }, [model]);

  return (
    <>
      <Container maxWidth="xl">
        <EZ_Header heading={"Transport Form"} />

        <Grid container spacing="50">
          <Grid item md={6} sm={12} xs={12}>
            <EZ_Input
              onChange={(e) => {
                setModel({ ...model, transportName: e.target.value });
              }}
              required
              label="Transport Name"
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <EZ_Dropdown
              onChange={(e) => {
                setModel({ ...model, transportType: e.target.value });
              }}
              nodeName="transportTypes"
              // data={[
              //   {
              //     id: "school",
              //     displayName: "School",
              //   },
              //   {
              //     id: "officevn",
              //     displayName: "Office Van",
              //   },
              //   {
              //     id: "private",
              //     displayName: "Private Transport",
              //   },
              // ]}
              displayField="transportTypeName"
              valueField="transportTypeCode"
              required
              label="Transport Type"
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <EZ_Dropdown
              onChange={(e) => {
                setModel({ ...model, availableRoute: e.target.value });
              }}
              nodeName="transportRoutes"
              displayField="transportRouteName"
              valueField="transportRouteCode"
              // data={[
              //   {
              //     id: "nipaToSafora",
              //     displayName: "NIPA to Safora",
              //   },
              //   {
              //     id: "gulshanToFB",
              //     displayName: "Gulshan to FB Area",
              //   },
              //   {
              //     id: "modelToTower",
              //     displayName: "Model Colony to Tower",
              //   },
              //   {
              //     id: "northKhiToIndus",
              //     displayName: "North Karachi to Indus Hospital",
              //   },
              //   {
              //     id: "gulshanHDToTower",
              //     displayName: "Gulshan e Hadeed to Tower",
              //   },
              //   {
              //     id: "NumaishToClifton",
              //     displayName: "Numaish Chowrangi to Sea View Clifton",
              //   },
              // ]}
              required
              label="Available Transport Routes"
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <EZ_Input
              required
              onChange={(e) => {
                setModel({ ...model, numberOfSeats: e.target.value });
              }}
              type="number"
              label="Number Of Seats"
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <EZ_Input
              required
              type="number"
              onChange={(e) => {
                setModel({ ...model, pricePerSeat: e.target.value });
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rs</InputAdornment>
                ),
              }}
              label="Price Per Seat"
            />
          </Grid>
          <Grid
            className="d-flex justify-content-center"
            item
            md={12}
            sm={12}
            sx={12}
          >
            <EZ_Button
              color="success"
              onClick={() => {
                sendTransportData(model, "transportData");
              }}
              isLoading={loading}
              padding="10px 40px"
              label="Submit Transport"
            />
          </Grid>
        </Grid>
        <EZ_Alert alertMessage={alertMessage} severity={severity} />
      </Container>

      <Container></Container>
      {transportList && transportList.length > 0 ? (
        <EZ_Table
          Cols={[
            {
              key: "id",
              displayName: "ID",
            },
            {
              key: "transportName",
              displayName: "Transport Name",
            },
            {
              key: "transportType",
              displayName: "Transport Type",
            },
            {
              key: "availableRoute",
              displayName: "Available Route",
            },
            {
              key: "numberOfSeats",
              displayName: "Number Of Available Seats",
            },
            {
              key: "pricePerSeat",
              displayName: "Price Per Seat",
            },
            {
              key: "Actions",
              displayName: "Actions",
            },
          ]}
          data={transportList}
        />
      ) : (
        <EZ_FullScreenLoader height="20vh" size="80px" />
      )}
    </>
  );
}
