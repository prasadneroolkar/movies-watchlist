import { createContext, useState } from "react";

export const contextWatchlist = createContext();

const WatchlistContext = ({ children }) => {
  const [listID, setlistID] = useState([]);
  const handleId = (id) => {
    localStorage.setItem(
      "currentID",
      id !== undefined ? JSON.stringify(id) : null
    );
    setlistID(id);
  };

  return (
    <contextWatchlist.Provider value={{ setlistID, handleId, listID }}>
      {children}
    </contextWatchlist.Provider>
  );
};

export default WatchlistContext;
