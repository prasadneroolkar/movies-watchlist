import { createContext, useState } from "react";

export const contextWatchlist = createContext();

const WatchlistContext = ({ children }) => {
  const [listID, setlistID] = useState([]);
  const handleId = (val) => {
    // localStorage.setItem(
    //   "currentID",
    //   id !== undefined ? JSON.stringify(id) : null
    // );
    setlistID(val);
  };

  return (
    <contextWatchlist.Provider value={{ setlistID, handleId, listID }}>
      {children}
    </contextWatchlist.Provider>
  );
};

export default WatchlistContext;
