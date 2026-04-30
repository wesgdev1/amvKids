import { useEffect, useState } from "react";
import {
  getAllInfluencers,
  createInfluencer,
} from "../../api/influencers/influencers";

export const useInfluencers = () => {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInfluencers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getAllInfluencers();
      setInfluencers(response.data || []);
    } catch {
      setError("No se pudieron cargar los creadores UGC.");
    } finally {
      setLoading(false);
    }
  };

  const addInfluencer = async (payload) => {
    const response = await createInfluencer(payload);
    await fetchInfluencers();
    return response;
  };

  useEffect(() => {
    fetchInfluencers();
  }, []);

  return { influencers, loading, error, fetchInfluencers, addInfluencer };
};
