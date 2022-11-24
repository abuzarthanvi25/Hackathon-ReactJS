import { Container, Grid } from "@mui/material";
import { getData, sendData } from "../../config/firebasemethods";
import React, { useEffect, useState } from "react";
import EZ_Button from "../../components/EZ_Button";
import EZ_Header from "../../components/EZ_Header";
import EZ_Input from "../../components/EZ_Input";
import EZ_Alert from "../../components/EZ_Alert";
import EZ_FullScreenLoader from "../../components/EZ_FullScreenLoader";
import EZ_Table from "../../components/EZ_Table";

export default function AddTransportTypes() {
  const [model, setModel] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [transportTypeList, setTransportTypeList] = useState([]);

  let sendTransportTypeData = () => {
    setLoading(true);
    sendData(model, "transportTypes")
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

  let getTransportTypes = () => {
    getData("transportTypes")
      .then((data) => {
        console.log(data);
        setTransportTypeList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTransportTypes();
    console.log(model);
  }, [model]);

  return (
    <>
      <Container maxWidth="xl">
        <EZ_Header heading={"Add Transport Types"} />
        <Grid container spacing={6}>
          <Grid item md={6} sm={6} xs={6}>
            <EZ_Input
              onChange={(e) => {
                setModel({ ...model, transportTypeName: e.target.value });
              }}
              required
              label="Transport Type"
            />
          </Grid>
          <Grid item md={6} sm={6} xs={6}>
            <EZ_Input
              onChange={(e) => {
                setModel({ ...model, transportTypeCode: e.target.value });
              }}
              required
              label="Transport Type Code"
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
              label="Add Transport Type"
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
      {transportTypeList && transportTypeList.length > 0 ? (
        <EZ_Table
          Cols={[
            {
              key: "id",
              displayName: "ID",
            },
            {
              key: "transportTypeName",
              displayName: "Transport Types",
            },
          ]}
          data={transportTypeList}
        />
      ) : (
        <EZ_FullScreenLoader height="20vh" size="80px" />
      )}
    </>
  );
}
