import { useEffect, useState } from "react";

import { getUsers } from "../../api/users/users";

export const useUsers = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cargarUsuarios = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getUsers();

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

  return { data, loading, error };
};
