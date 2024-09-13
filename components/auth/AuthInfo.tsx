import { auth } from "@/auth";
import React from "react";

const AuthInfo = async () => {
  const session = await auth();

  if (!session || !session.user) return null;

  return (
    <div>
      <h3>AuthInfo</h3>
      {JSON.stringify(session.user, null, 2)}
    </div>
  );
};

export default AuthInfo;
