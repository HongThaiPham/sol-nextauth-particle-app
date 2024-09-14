"use client";
import React, { PropsWithChildren } from "react";
import { ParticleConnectkit } from "./connectkit";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const AppProvider: React.FC<PropsWithChildren & { session?: Session }> = ({
  children,
  session,
}) => {
  return (
    <SessionProvider session={session}>
      <ParticleConnectkit>{children}</ParticleConnectkit>
    </SessionProvider>
  );
};

export default AppProvider;
