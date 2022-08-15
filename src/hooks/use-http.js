import { useState, useCallback } from "react";

/**
 * Custom hook to handle HTTP requests
 * requestConfig handles POST or GET requests configuration
 * if requestConfig is set, apply it, else default 
 * method to 'GET', headers to an empty object and body to null
 * Assumes always working with JSON data.
 * sendRequest checks the response of the request and collects the data,
 * This data is then passed to the applyData function.
 *
 * loading & error state plus sendRequest are returned to the component using the hook
 */

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
