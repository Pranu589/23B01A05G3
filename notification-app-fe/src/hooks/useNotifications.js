import { useEffect, useState } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (err) {
        setError(err.message || "Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    notifications,
    total: notifications.length,
    totalPages: 1,
    loading,
    error,
  };
}