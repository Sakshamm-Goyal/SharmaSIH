import { useEffect, useState } from 'react';

export default function useData(filePath) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        setData(Object.values(jsonData.topics)); // Assuming you want to access "topics" data

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err);
        console.error('Error fetching data:', err);
      }
    }

    fetchData();
  }, [filePath]);

  return { loading, error, data };
}
