"use client";

import type React from "react";
import { useChromia } from "@/libs/chromia-connect/chromia-context";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading/Loading";

const Layout = ({
  authenticated,
  unauthenticated,
  notRegistered,
}: Readonly<{
  authenticated: React.ReactNode;
  unauthenticated: React.ReactNode;
  notRegistered: React.ReactNode;
}>) => {
  const { isLoading, authStatus } = useChromia();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Wait for initial auth check to complete
    if (!isLoading) {
      setIsInitialLoad(false);
    }
  }, [isLoading]);

  // Always show loading during initial load or auth check for protected routes
  if (isInitialLoad || isLoading) {
    return <Loading />;
  }

  if (authStatus === "notRegistered") {
    return <>{notRegistered}</>;
  }

  if (authStatus === "connected") {
    return <>{authenticated}</>;
  }
  return <>{unauthenticated}</>;
};

export default Layout;

