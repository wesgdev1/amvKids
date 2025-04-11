import { useEffect, useState } from "react";
import { myProfile } from "../../api/auth/auth";

export const useProfile = (id) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarUsuarios = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await myProfile(id);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return { data, loading, error, cargarUsuarios };
};
