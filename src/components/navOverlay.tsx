import React from "react";
import {Collapse, Stack} from "@mui/material";

import {navConfig} from "../configs/nav";
import {Link} from "react-router-dom";

const NavOverlay = ({navRef, hasLoggedIn, visibility, setVisibility, indexExpanded, handleNavClick}: {
    navRef: React.RefObject<HTMLElement>,
    hasLoggedIn: boolean,
    visibility: boolean,
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    indexExpanded: number,
    handleNavClick: (newIndex: number) => void,
}) => {
    const navHeight = navRef.current?.clientHeight ?? 42.5;

    function closeNavOverlay() {
        setVisibility(false);
    }

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
                const show = item.requiresAdmin === undefined || item.requiresAdmin === hasLoggedIn;
                if (!show) {
                    return null;
                }
                const hasChildren = item.children !== undefined && item.children.length > 0;
                return (
                    <>
                        {hasChildren && <span
                            key={index}
                            onClick={(event) => {
                                event.stopPropagation();
                                handleNavClick(index);
                            }}
                        >
                            {item.value}
                        </span>}
                        {!hasChildren && <Link
                            key={index}
                            to={item.to}
                            onClick={() => {
                                handleNavClick(index);
                            }}
                        >
                            {item.value}
                        </Link>}
                        <Collapse
                            in={indexExpanded === index}
                            sx={{
                                width: "100%",
                                boxShadow: "rgba(0, 0, 0, 1) 0px 3px 9px -9px inset, " +
                                    "rgba(0, 0, 0, 1) 0px -3px 9px -9px inset;"
                            }}
                        >
                            {item.children?.map((child, childIndex) => (
                                <Link key={childIndex} to={child.to}>{child.value}</Link>
                            ))}
                        </Collapse>
                    </>
                );
            })}
        </Stack>
    )
}

export default NavOverlay;