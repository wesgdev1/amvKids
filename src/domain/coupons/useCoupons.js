import { useEffect, useState } from "react";
import { getAllCoupons, createCoupon, updateCouponState } from "../../api/orders/orders";

export const useCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCoupons = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getAllCoupons();
      setCoupons(response.data || []);
    } catch {
      setError("No se pudieron cargar los cupones.");
    } finally {
      setLoading(false);
    }
  };

  const addCoupon = async (payload) => {
    const response = await createCoupon(payload);
    await fetchCoupons();
    return response;
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const toggleCouponState = async (id, currentState) => {
    await updateCouponState(id, { state: !currentState });
    await fetchCoupons();
  };

  return { coupons, loading, error, fetchCoupons, addCoupon, toggleCouponState };
};
