import { Box, CircularProgress } from "@mui/material";

export default function EZ_FullScreenLoader({
  height = "98vh",
  color,
  bgColor,
  size,
}) {
  return (
    <>
      <Box
        style={{
          height: height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: bgColor ?? "white",
        }}
      >
        <CircularProgress color={color ?? "primary"} size={size ?? "250px"} />
      </Box>
    </>
  );
}
