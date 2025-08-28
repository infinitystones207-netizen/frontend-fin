import React, { useEffect, useState } from "react";

const LeadTable = ({ apiUrl, token }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your actual API endpoint and authentication if needed
    const fetchLeads = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/leads/mine`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const data = await res.json();
        setLeads(data);
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      }
      setLoading(false);
    };

    fetchLeads();
  }, [apiUrl, token]);

  if (loading) return <div>Loading leads...</div>;

  if (!leads.length) return <div>No leads found.</div>;

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "white",
        color: "#222",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
      }}>
        <thead style={{ background: "#1e90ff", color: "white" }}>
          <tr>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Phone</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td style={{ padding:

