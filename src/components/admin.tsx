import {Outlet, RouteObject} from "react-router-dom";
import React from "react";

import Dashboard from "./dashboard";
import NoteEditor from "./noteEditor";
import NoteMetaForm from "./noteMetaForm";
import NotFound from "./notFound";

const Admin = () => {
    const tokenJSON = localStorage.getItem("token");
    if (!tokenJSON) {
        return <NotFound/>
    }
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