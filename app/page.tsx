import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setData(data))
  })



  return (
    <div style={{ padding: '50px' }}>
      <h1>My Dashboard</h1>
      {data ? (
        <div>
          <p>message: {data.message}</p>
          <p>Time: {data.timestamp}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
