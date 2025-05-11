import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CraftDisplay from "../components/CraftDisplay";
import exampleCraft from "../data/craftExample.json";

const CraftDetailPage = () => {
  const { id } = useParams();
  const [craftData, setCraftData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch the craft data from your API
    const fetchCraftData = async () => {
      try {
        setLoading(true);
        // Example API call (uncomment and modify for your actual API)
        // const response = await fetch(`/api/craft/${id}`);
        // const data = await response.json();

        // For now, we'll just use the example data with a delay to simulate loading
        setTimeout(() => {
          setCraftData(exampleCraft);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to load craft data");
        setLoading(false);
      }
    };

    fetchCraftData();
  }, [id]);

  if (loading) return <div className="loading">Loading craft details...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="craft-detail-page">
      <div className="container py-4">
        <CraftDisplay craftData={craftData} />
      </div>
    </div>
  );
};

export default CraftDetailPage;
