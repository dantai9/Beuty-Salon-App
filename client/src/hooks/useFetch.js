import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export const useFetch = (endpoint, options = {}, immediate = true) => {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const request = async (body, overrideOptions = {}) => {
    setLoading(true);
    setError(null);
    try {
      const url = overrideOptions.url || endpoint;
      const res = await fetch(url, {
        ...options,
        ...overrideOptions,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
          ...(overrideOptions.headers || {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : overrideOptions.body || options.body,
      });

      if (!res.ok) {
        const message = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(message.message || 'Request failed');
      }

      const result = await res.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) {
      request();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, request, setData };
};
