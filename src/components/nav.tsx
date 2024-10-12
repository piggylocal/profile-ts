import React from "react";
import {useLocalStorage, useWindowSize} from "@uidotdev/usehooks";
import {Divider, Stack} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";

import "../styles/nav.css";
import {navConfig, NavItemConfig} from "../configs/nav";
import MenuCloseButton from "./menuCloseButton";
import NavOverlay from "./navOverlay";
import NavMenu from "./navMenu";

const Nav = () => {
    const ref = React.useRef<HTMLElement>(null);
    const itemRefs = React.useRef<Map<number, HTMLSpanElement | null>>(new Map());
    const addToItemRefs = (el: HTMLSpanElement | null, index: number) => {
        itemRefs.current.set(index, el);
    };

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

    const {width} = useWindowSize();
    const isFullNav = width === null || width >= (getCurrentNavItemCount() * (120 + 1) - 1);

    const navigate = useNavigate();

    function handleMouse(event: MouseEvent) {
        if (!event.target || !(event.target instanceof HTMLElement)) {
            return;
        }
        for (const [index, itemRef] of itemRefs.current) {
            if (itemRef?.contains(event.target as HTMLElement)) {
                setIndexExpanded(index);
                return;
            }
        }
        setIndexExpanded(-1);
    }

    React.useEffect(() => {
        if (isFullNav) {
            setShowMenuOverlay(false);
            setIndexExpanded(-1);
        }
    }, [isFullNav]);

    React.useEffect(() => {
        window.addEventListener("mouseover", handleMouse);

        return () => {
            window.removeEventListener("mouseover", handleMouse);
        }
    }, []);

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
                const show = item.requiresAdmin === undefined || item.requiresAdmin === hasLoggedIn;
                if (!show) {
                    return null;
                }
                const hasChildren = item.children !== undefined && item.children.length > 0;

                if (hasChildren) {
                    return (
                        <span key={index} ref={(el) => addToItemRefs(el, index)}>
                            {item.value}
                            <NavMenu
                                items={item.children as NavItemConfig[]}
                                visibility={indexExpanded === index}
                                setIndexExpanded={setIndexExpanded}
                            />
                        </span>
                    )
                }
                return (
                    <Link key={index} to={item.to}>{item.value}</Link>
                );
            })}
        </Stack>
    )
};

export default Nav;