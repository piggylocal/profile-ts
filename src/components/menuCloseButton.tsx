import React from "react";

import "../styles/menuCloseButton.css";

const MenuCloseButton = () => {
    const ref = React.useRef<HTMLDivElement>(null);
    return (
        <div className="menu-close" ref={ref} onClick={() => ref.current?.classList.toggle("close")}>
            <div className="bar"></div>
        </div>
    )
}

export default MenuCloseButton;