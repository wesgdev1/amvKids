import { useEffect, useState } from "react";
import { getInfluencerById } from "../../api/influencers/influencers";
import { createCoupon, updateCouponState } from "../../api/orders/orders";

export const useInfluencer = (id) => {
  const [influencer, setInfluencer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInfluencer = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getInfluencerById(id);
      setInfluencer(response.data);
    } catch {
      setError("No se pudo cargar el creador.");
    } finally {
      setLoading(false);
    }
  };

  const addCoupon = async (payload) => {
    const response = await createCoupon({ ...payload, influencerId: id });
    await fetchInfluencer();
    return response;
  };

  const toggleCouponState = async (couponId, currentState) => {
    await updateCouponState(couponId, { state: !currentState });
    await fetchInfluencer();
  };

  useEffect(() => {
    if (id) fetchInfluencer();
  }, [id]);

  return { influencer, loading, error, fetchInfluencer, addCoupon, toggleCouponState };
};
