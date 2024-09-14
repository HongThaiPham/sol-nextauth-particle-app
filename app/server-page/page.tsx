import { auth } from "@/auth";
import React from "react";

const ServerPage = async ({}) => {
  const session = await auth();
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">React Server Component Usage</h1>

      <div>
        <h2 className="text-2xl font-bold">Session</h2>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ServerPage;
