"use client";

import Loading from "@/components/Loading/Loading";
import { useChromia } from "@/libs/chromia-connect/chromia-context";
import type React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Layout = ({
  authenticated: _authenticated,
  notRegistered,
}: Readonly<{
  authenticated: React.ReactNode;
  notRegistered: React.ReactNode;
}>) => {
  const { authStatus, isLoading } = useChromia();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && authStatus === "disconnected") {
      router.replace("/");
    }
  }, [authStatus, isLoading, router]);

  // Show loading until we're sure about the auth state
  if (isLoading) {
    return <Loading />;
  }

  if (authStatus === "notRegistered") {
    return <>{notRegistered}</>;
  }

  if (authStatus === "connected") {
    return <>{_authenticated}</>;
  }

  // Return loading while redirecting to prevent flash
  return <Loading />;
};

export default Layout;
