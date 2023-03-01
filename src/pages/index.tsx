import React, { useEffect, useState } from "react";
import Router from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { pathname } = Router;
    if (pathname == "/") {
      Router.push("/home");
    }
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        height: "100vh",
        minHeight: "100vh",
      }}
    >
      <div style={{ color: "blue" }}>
        Being Redirected {loading && <CircularProgress />}{" "}
      </div>
      ;
    </Box>
  );
}
