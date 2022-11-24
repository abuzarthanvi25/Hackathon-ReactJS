import { Button, CircularProgress } from "@mui/material";
import React from "react";

export default function EZ_Button(props) {
  const {
    label,
    onClick,
    startIcon,
    endIcon,
    color,
    padding,
    margin,
    fullWidth,
    disabled,
    isLoading = false,
  } = props;
  // -- TYPE CHECK
  // label: <String>
  // startIcon: <Icon>
  // endIcon: <Icon>
  // color: <String>
  // padding: <String>
  // margin: <String>
  // onClick: <function>

  return (
    <>
      <Button
        fullWidth={fullWidth}
        disabled={disabled}
        onClick={onClick}
        endIcon={endIcon}
        startIcon={startIcon}
        color={color}
        sx={{ padding: { padding }, margin: { margin } }}
        variant="contained"
      >
        {isLoading ? <CircularProgress color="warning" /> : label}
      </Button>
    </>
  );
}
