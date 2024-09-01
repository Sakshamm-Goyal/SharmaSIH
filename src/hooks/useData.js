import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

export default function useData(address) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Better to use null for error state
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from Firebase database
    async function fetchTopics() {
      const db = getDatabase();
      const dataRef = ref(db, address);
      const dataQuery = query(dataRef, orderByKey());

      try {
        setLoading(true);
        setError(null);  // Reset error state before fetching

        // Request to Firebase database
        const snapshot = await get(dataQuery);
        setLoading(false);

        if (snapshot.exists()) {
          // Ensure data is processed correctly
          setData(Object.values(snapshot.val()));  // Reset data, assuming new data replaces old
        } else {
          setData([]);  // Handle case where no data exists
        }
      } catch (err) {
        setLoading(false);
        setError(err);  // Set the actual error object for better debugging
        console.error("Error fetching data:", err);  // Log error to console
      }
    }

    fetchTopics();
  }, [address]);  // Dependency on address means hook will refetch when address changes

  return { loading, error, data };
}
