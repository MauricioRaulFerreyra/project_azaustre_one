import { useEffect, useState } from "react";

export function GetAllLaunches(API_URL) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);
    setLoading(false);
    fetch(`${API_URL}/launches`, { signal: abortController.signal })
      .then(response => response.json())
      .then(res => setData(res))
      .catch(error => {
        if (error.name === 'AbortError') {
          console.log('Request cancelled')
        } else {
          setError(error)
        }
      })
      .finally(() => setLoading(false));
    return () => abortController.abort();
  }, []);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError('Request Cancelled')
    }
  };

  return { data, loading, error, handleCancelRequest };
}


const API_URL = "https://api.spacexdata.com/v3";

export async function GetLauncheByFlightNumber(flightNumber) {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [controller, setController] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    setController(abortController);
    setLoading(false);
    fetch(`${API_URL}/launches/${flightNumber}`, { signal: abortController.signal })
      .then(response => response.json())
      .then(res => setData(res))
      .catch(error => {
        if (error.name === 'AbortError') {
          console.log('Request cancelled')
        } else {
          setError(error)
        }
      })
      .finally(() => setLoading(false));
    return () => abortController.abort();
  }, []);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
      setError('Request Cancelled')
    }
  };

  return { data, loading, error, handleCancelRequest };

}
