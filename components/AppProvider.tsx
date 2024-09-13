"use client";
import React, { PropsWithChildren } from "react";
import { ParticleConnectkit } from "./connectkit";
import { SessionProvider } from "next-auth/react";

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <ParticleConnectkit>{children}</ParticleConnectkit>
    </SessionProvider>
  );
};

export default AppProvider;
