import React from "react";

import "../styles/menuCloseButton.css";

const MenuCloseButton = ({showMenuOverlay, setShowMenuOverlay}: {
    showMenuOverlay: boolean,
    setShowMenuOverlay: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
    return (
        <div
            className={`menu-close ${showMenuOverlay ? "close" : ""}`}
            onClick={() => setShowMenuOverlay(!showMenuOverlay)}
            style={{
                marginTop: "14px",
                marginLeft: "16px",
            }}
        >
            <div className="bar"></div>
        </div>
    )
}

export default MenuCloseButton;