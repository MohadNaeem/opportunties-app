// pages/admin.js
"use client";

import { useState } from "react";
import handler from '../../api/fetchSAMData'

function Admin() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFetchData = async () => {
    setLoading(true);
    setMessage("");
    
    try {
      const response = await handler();
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={handleFetchData} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Data from SAM.gov"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Admin;
