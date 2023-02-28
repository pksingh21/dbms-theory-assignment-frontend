import React, { useEffect, useState } from "react";
import Router from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { pathname } = Router;
    if (pathname == "/") {
      Router.push("/home");
    }
  }, []);
  return <>Being Redirected {loading && <CircularProgress />} </>;
}
