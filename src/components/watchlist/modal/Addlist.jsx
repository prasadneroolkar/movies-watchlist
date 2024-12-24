import { useState } from "react";

const Addlist = ({
  children,
  menuPosition,
  menuVisible,
  onClickOutside,
  onToggleMenu,
}) => {
  const handleContext = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    onToggleMenu(e.pageX, e.pageY);
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
