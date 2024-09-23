import React from "react";
import {Stack} from "@mui/material";

import {navConfig} from "../configs/nav";
import {Link} from "react-router-dom";

const NavOverlay = ({navRef, hasLoggedIn, visibility, setVisibility}: {
    navRef: React.RefObject<HTMLElement>,
    hasLoggedIn: boolean,
    visibility: boolean,
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
    function closeNavOverlay() {
        setVisibility(false);
    }

    const navHeight = navRef.current?.clientHeight ?? 0;

    return (
        <Stack
            className="nav-overlay"
            direction="column"
            sx={{
                position: "fixed",
                top: navHeight,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 100,
                backgroundColor: "white",
                justifyContent: "flex-start",
                alignItems: "center",
                visibility: visibility ? "visible" : "hidden",
                opacity: visibility ? 1 : 0,
                transition: "0.3s ease-in-out",
            }}
            onClick={closeNavOverlay}
        >
            {navConfig.items.map((item, index) => {
                if (item.requiresAdmin === undefined) return (
                    <Link key={index} to={item.to} onClick={closeNavOverlay}>{item.value}</Link>
                );
                if (item.requiresAdmin) return (
                    hasLoggedIn && <Link key={index} to={item.to} onClick={closeNavOverlay}>{item.value}</Link>
                );
                return (
                    !hasLoggedIn && <Link key={index} to={item.to} onClick={closeNavOverlay}>{item.value}</Link>
                );
            })}
        </Stack>
    )
}

export default NavOverlay;