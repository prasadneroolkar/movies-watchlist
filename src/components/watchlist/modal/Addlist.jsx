import { useState } from "react";

const Addlist = ({ children }) => {
  const [menuVisible, setMenuvisible] = useState(false);
  const [menuPosition, setMenuposition] = useState({ x: 0, y: 0 });

  const handleContext = (e) => {
    e.preventDefault();
    setMenuposition({ x: e.pageX, y: e.pageY });
    setMenuvisible(true);
    console.log("clicked");
  };

  // const handleClick = () => {
  //   setMenuvisible(false);
  // };

  return (
    <>
      <div
        className="contextClass"
        // onContextMenu={handleContext}
        onClick={handleContext}
      >
        {children}
        {menuVisible && (
          <ul>
            <li>new playlist</li>
            <li>my playlist</li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Addlist;
