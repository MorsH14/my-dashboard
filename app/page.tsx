"use client"

import { useEffect, useState } from "react";

// Define the shape of your data
interface ApiData {
  message: string;
  timestamp: string;
  name: string;
  username: string;
  gender: "male" | "female";
}

export default function Home() {
  // Tell TypeScript what type data will be
  const [data, setData] = useState<ApiData | null>(null);

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error('Error fetching data:', err));
  }, []); // ⚠️ Add empty array here!

  return (
    <div style={{ padding: '50px' }}>
      <h1>My Dashboard</h1>
      {data ? (
        <div>
          <p>message: {data.message}</p>
          <p>Time: {data.timestamp}</p>
          <p>name: {data.name}</p>
          <p>username: {data.username}</p>
          <p>gender: {data.gender}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}