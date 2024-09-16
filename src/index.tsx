import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import './styles/style.css';
import './styles/about.css';
import './styles/hoverImgBox.css';
import Profile from "./components/profile";
import Photo from "./components/photo";
import NoteDisplay from "./components/noteDisplay";
import Notes from "./components/notes";
import Login from "./components/login";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Notes/>
            },
            {
                path: "/:noteId",
                element: <NoteDisplay/>
            },
            {
                path: "/profile",
                element: <Profile/>
            },
            {
                path: "/photo",
                element: <Photo/>
            },
            {
                path: "/login",
                element: <Login/>
            }
        ]
    }
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
