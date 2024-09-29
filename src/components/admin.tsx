import {Outlet, RouteObject} from "react-router-dom";
import React from "react";

import Dashboard from "./dashboard";
import NoteEditor from "./noteEditor";
import NoteMetaForm from "./noteMetaForm";

const Admin = () => {
    return <Outlet/>
}

export default Admin;
export const adminRoutes: RouteObject[] = [
    {
        path: "",
        element: <Dashboard/>,
    },
    {
        path: "editor",
        element: <NoteEditor/>,
    },
    {
        path: "meta",
        element: <NoteMetaForm/>,
    }
]