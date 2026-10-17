import { useState, useEffect } from "react";

const STORAGE_KEY = "moviebox_watchlist";

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (item) => {
    setWatchlist((prev) => {
      if (
        prev.some((i) => i.id === item.id && i.media_type === item.media_type)
      ) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromWatchlist = (id, type) => {
    setWatchlist((prev) =>
      prev.filter((i) => !(i.id === id && i.media_type === type)),
    );
  };

  const isInWatchlist = (id, type) => {
    return watchlist.some((i) => i.id === id && i.media_type === type);
  };

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
};
