import React from "react";
import {List, ListItem, ListItemButton, ListItemText, Paper} from "@mui/material";
import {Link} from "react-router-dom";

import {NavItemConfig} from "../configs/nav";

const NavMenu = ({items, visibility, setIndexExpanded}: {
    items: NavItemConfig[],
    visibility: boolean,
    setIndexExpanded: React.Dispatch<React.SetStateAction<number>>,
}) => {
    return (
        <Paper sx={{
            position: "absolute",
            top: "100%",
            visibility: visibility ? "visible" : "hidden",
        }}>
            <List>
                {items.map((item, index) => (
                        <ListItem
                            key={index}
                            disablePadding
                            onClick={() => {setIndexExpanded(-1)}}
                        >
                            <ListItemButton
                                component={Link}
                                to={item.to}
                                sx={{padding: 0}}
                                disableTouchRipple
                            >
                                <ListItemText primary={item.value}/>
                            </ListItemButton>
                        </ListItem>
                    )
                )}
            </List>
        </Paper>
    )
}

export default NavMenu;