"use client";

import { useChromia } from "@/libs/chromia-connect/chromia-context";
import type React from "react";

const Layout = ({
  authenticated: _authenticated,
  unauthenticated,
  notRegistered,
}: Readonly<{
  authenticated: React.ReactNode;
  unauthenticated: React.ReactNode;
  notRegistered: React.ReactNode;
}>) => {
  const { authStatus } = useChromia();
  console.log(`authStatus: ${authStatus}`);

  if (authStatus === "notRegistered") {
    console.log("Detected notRegistered");
    return <>{notRegistered}</>;
  }

  return <>{authStatus === "connected" ? _authenticated : unauthenticated}</>;
};

export default Layout;
