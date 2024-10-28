"use client";

import Loading from "@/components/Loading/Loading";
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
  const { authStatus, isLoading } = useChromia();

  if (isLoading) {
    return <Loading />;
  }

  if (authStatus === "notRegistered") {
    return <>{notRegistered}</>;
  }

  return <>{authStatus === "connected" ? _authenticated : unauthenticated}</>;
};

export default Layout;
