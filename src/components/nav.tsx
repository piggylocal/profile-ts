import React from "react";
import {useLocalStorage, useWindowSize} from "@uidotdev/usehooks";
import {Divider, Stack} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

import "../styles/nav.css";
import {navConfig} from "../configs/nav";
import MenuCloseButton from "./menuCloseButton";
import NavOverlay from "./navOverlay";

const Nav = () => {
    const itemHasChildren = navConfig.items.map((item) => item.children !== undefined);

    const ref = React.useRef<HTMLElement>(null);

    const [showMenuOverlay, setShowMenuOverlay] = React.useState(false);
    const [indexExpanded, setIndexExpanded] = React.useState(-1);

    const [token,] = useLocalStorage<string | undefined>("token", undefined);
    const hasLoggedIn = Boolean(token);

    function getCurrentNavItemCount() {
        return navConfig.items.filter((item) => {
            if (item.requiresAdmin === undefined) return true;
            if (item.requiresAdmin) return hasLoggedIn;
            return !hasLoggedIn;
        }).length;
    }

    function handleNavClick(newIndex: number) {
        if (indexExpanded === newIndex) {
            setIndexExpanded(-1);
            return
        }
        if (itemHasChildren[newIndex]) {
            setIndexExpanded(newIndex);
        } else {
            setIndexExpanded(-1);
        }
    }

    const {width} = useWindowSize();
    const isFullNav = width === null || width >= (getCurrentNavItemCount() * (120 + 1) - 1);

    const navigate = useNavigate();

    React.useEffect(() => {
        if (isFullNav) {
            setShowMenuOverlay(false);
        }
    }, [isFullNav]);

    if (!isFullNav) {
        return (
            <Stack
                component="nav"
                ref={ref}
                direction="row"
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "42.5px"
                }}
            >
                <NavOverlay
                    navRef={ref}
                    hasLoggedIn={hasLoggedIn}
                    visibility={showMenuOverlay}
                    setVisibility={setShowMenuOverlay}
                    indexExpanded={indexExpanded}
                    handleNavClick={handleNavClick}
                />
                <MenuCloseButton
                    showMenuOverlay={showMenuOverlay}
                    setShowMenuOverlay={setShowMenuOverlay}
                />
                <img
                    src={process.env.PUBLIC_URL + "/mono-pine.svg"}
                    alt=""
                    className="logo"
                    style={{
                        height: "30.5px",
                    }}
                    onClick={() => {
                        navigate("/");
                        setShowMenuOverlay(false);
                    }}
                />
            </Stack>
        )
    }

    return (
        <Stack
            component="nav"
            divider={isFullNav && <Divider orientation="vertical" variant="middle" flexItem/>}
            direction="row"
            sx={{
                justifyContent: "flex-start",
                alignItems: "center",
            }}
        >
            {navConfig.items.map((item, index) => {
                if (item.requiresAdmin === undefined) return (
                    <Link key={index} to={item.to}>{item.value}</Link>
                );
                if (item.requiresAdmin) return (
                    hasLoggedIn && <Link key={index} to={item.to}>{item.value}</Link>
                );
                return (
                    !hasLoggedIn && <Link key={index} to={item.to}>{item.value}</Link>
                );
            })}
        </Stack>
    )
};

export default Nav;