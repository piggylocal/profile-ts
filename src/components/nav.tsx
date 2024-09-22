import React from "react";
import {useLocalStorage, useWindowSize} from "@uidotdev/usehooks";

import "../styles/nav.css";
import {Divider, Stack} from "@mui/material";
import {Link} from "react-router-dom";
import MenuCloseButton from "./menuCloseButton";

const Nav = () => {
    const {width} = useWindowSize();
    const isFullNav = width === null || width >= (5 * (120 + 1) - 1)

    const [token,] = useLocalStorage<string | undefined>("token", undefined);
    const hasLoggedIn = Boolean(token);

    if (!isFullNav) {
        return (
            <Stack
                component="nav"
                direction="row"
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "42.5px"
                }}
            >
                <MenuCloseButton/>
                <img
                    src={process.env.PUBLIC_URL + "/mono-pine.svg"}
                    alt=""
                    className="logo"
                    style={{
                        height: "30.5px",
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
            <Link to="/">Notes</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/photo">Photo</Link>
            <Link to="https://wordle-plus.netlify.app/">Wordle+</Link>
            {!hasLoggedIn && <Link to="/login">Login</Link>}
            {hasLoggedIn && <Link to="/admin">Admin</Link>}
        </Stack>
    )
};

export default Nav;