import React from "react";
import { getData } from "./_actions/getData";

const ServerActionPage = async () => {
  const data = await getData();

  return (
    <div>
      <h2>ServerActionPage</h2>
      <div>
        <h3>Data</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ServerActionPage;
