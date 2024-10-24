import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {GoogleOAuthProvider} from '@react-oauth/google';
import {Backdrop, CircularProgress} from "@mui/material";

import './App.css';
import Nav from "./components/nav";
import {getIP} from "./managers/ip";
import {VisitorLog} from "./dto/user";
import {LoadingContext} from "./contexts/loadingContext";

function App() {
    const [loading, setLoading] = React.useState<boolean>(false);

    const location = useLocation();
    React.useEffect(() => {
        async function createVisitorLog() {
            const log: VisitorLog = {
                pathname: location.pathname,
                time: new Date(),
                ip: await getIP() || ""
            };

            const request = new Request(`${process.env.REACT_APP_API}/user/visitor-log`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(log),
            });
            try {
                const response = await fetch(request);
                if (!response.ok) {
                    console.error("Failed to post visitor log");
                    return;
                }
            } catch (error) {
                console.error(error);
            }
        }

        void createVisitorLog();
    }, [location])

    return (
        <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
            <LoadingContext.Provider value={{loading, setLoading}}>
                <header>
                    <Nav/>
                </header>
                <Outlet/>
            </LoadingContext.Provider>
            <Backdrop open={loading} sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </GoogleOAuthProvider>
    );
}

export default App;
