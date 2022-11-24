import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import EZ_Alert from "../../components/EZ_Alert";
import EZ_Button from "../../components/EZ_Button";
import EZ_FullScreenLoader from "../../components/EZ_FullScreenLoader";
import EZ_Header from "../../components/EZ_Header";
import EZ_Input from "../../components/EZ_Input";
import EZ_Table from "../../components/EZ_Table";
import { getData, sendData } from "../../config/firebasemethods";

export default function AddTransportRoutes() {
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [transportRouteList, setTransportRouteList] = useState([]);

  let sendTransportTypeData = () => {
    setLoading(true);
    sendData(model, "transportRoutes")
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

  let getTransportRoutes = () => {
    getData("transportRoutes")
      .then((data) => {
        console.log(data);
        setTransportRouteList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTransportRoutes();
    console.log(model);
  }, [model]);

  return (
    <>
      <Container maxWidth="xl">
        <EZ_Header heading={"Add Transport Routes"} />
        <Grid container spacing={6}>
          <Grid item md={6} sm={6} xs={6}>
            <EZ_Input
              onChange={(e) => {
                setModel({ ...model, transportRouteName: e.target.value });
              }}
              required
              label="Transport Route"
            />
          </Grid>
          <Grid item md={6} sm={6} xs={6}>
            <EZ_Input
              onChange={(e) => {
                setModel({ ...model, transportRouteCode: e.target.value });
              }}
              required
              label="Transport Route Code"
            />
          </Grid>
          <Grid
            className="d-flex justify-content-center"
            item
            md={12}
            sm={6}
            xs={6}
          >
            <EZ_Button
              label="Add Transport Route"
              color="success"
              padding="15px 50px"
              isLoading={loading}
              onClick={() => {
                sendTransportTypeData();
              }}
            />
          </Grid>
        </Grid>
        <EZ_Alert alertMessage={alertMessage} severity={severity} />
      </Container>
      {transportRouteList && transportRouteList.length > 0 ? (
        <EZ_Table
          Cols={[
            {
              key: "id",
              displayName: "ID",
            },
            {
              key: "transportRouteName",
              displayName: "Transport Routes",
            },
          ]}
          data={transportRouteList}
        />
      ) : (
        <EZ_FullScreenLoader height="20vh" size="80px" />
      )}
    </>
  );
}
