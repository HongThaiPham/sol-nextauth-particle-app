"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const CallApiClientPage = () => {
  const { data: session } = useSession();
  const [data, setData] = React.useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/data").then((res) => res.json());
      setData(response);
    })();
  }, []);
  if (!session) return null;
  return (
    <div>
      <h2>CallApiClientPage</h2>
      <div>
        <h3>Data</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default CallApiClientPage;
