import { Children } from "react";
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

  const handleClick = () => {
    setMenuvisible(false);
  };

  return (
    <>
      <div
        className="contextClass"
        onContextMenu={handleContext}
        onClick={handleClick}
      >
        {children}
        {menuVisible && (
          <ul
            style={{
              position: "absolute",
              top: menuPosition.y,
              left: menuPosition.x,
              background: "white",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "10px",
              listStyle: "none",
            }}
          >
            <li style={{ padding: "5px 10px", cursor: "pointer" }}>Option 1</li>
            <li style={{ padding: "5px 10px", cursor: "pointer" }}>Option 2</li>
            <li style={{ padding: "5px 10px", cursor: "pointer" }}>Option 3</li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Addlist;
