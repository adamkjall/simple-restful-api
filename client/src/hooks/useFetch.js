import { useState, useEffect } from "react";

export const useFetch = (request) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!request) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(request.url, request.options);
        const json = await res.json();

        setResponse(json);

        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [request]);
  return [response, error, loading];
};
