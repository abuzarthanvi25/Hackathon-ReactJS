import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function SNIPPETS() {
  // model state
  const [model, setModel] = useState({});

  // list state
  const [list, setList] = useState([]);

  // alert states
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");

  // redux states
  const dispatch = useDispatch(func(payload));
  const dataFromStore = useSelector((state) => state.loginReducer);

  // router states
  let navigate = useNavigate();
  const location = useLocation();

  // useEffect snippet
  useEffect(() => {}, []);

  // send Data snippet
  let SENDSOMEDATA = (data, node) => {
    setLoading(true);
    sendData(data, node)
      .then((success) => {
        setLoading(false);
        setAlertMessage(success);
        setTimeout(() => {
          setAlertMessage("");
          setServerity("");
        }, 3000);
        setServerity("success");
        console.log(success);
      })
      .catch((err) => {
        setLoading(false);
        setAlertMessage(err);
        setServerity("error");
        setTimeout(() => {
          setAlertMessage("");
          setServerity("");
        }, 3000);
        console.log(err);
        setError(err);
      });
  };

  // get Data snippet
  let GETSOMEDATA = () => {
    getData(node)
      .then((success) => {
        console.log(success);
        setList(success);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  // Data Grid Columns
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerClassName: "table-header",
    },
    {
      field: "age",
      headerName: "Age",
      headerClassName: "table-header",
      type: "number",
      width: 110,
      editable: true,
    },

    {
      field: "fullName",
      headerName: "Full name",
      headerClassName: "table-header",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  return (
    <>
      {/* GRID SNIPPET */}
      <Grid container>
        <Grid item md={4} sm={12} xs={12}></Grid>
      </Grid>

      {/* TYPOGRAPHY SNIPPET */}
      <Typography variant="h3" gutterBottom>
        Some text
      </Typography>

      {/* INPUT SNIPPET */}
      <EZ_Input
        label="Last Name"
        required={true}
        value={model.key}
        onChange={(e) => {
          setModel({ ...model, key: e.target.value });
        }}
      />

      {/* DROPDOWN SNIPPET */}
      <EZ_Dropdown
        label="label"
        value={model.section}
        data={[
          {
            id: "A",
            displayName: "Section A",
          },
          {
            id: "B",
            displayName: "Section B",
          },
        ]}
        onChange={(e) => {
          setModel({ ...model, key: e.target.value });
        }}
      />
    </>
  );
}
