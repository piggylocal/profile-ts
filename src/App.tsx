import React from 'react';
import {Outlet, useLocation} from "react-router-dom";

import './App.css';
import Nav from "./components/nav";
import {getIP} from "./services/ip";
import {VisitorLog} from "./dto/user";

function App() {
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
        <>
            <header>
                <Nav/>
            </header>
            <Outlet/>
        </>
    );
}

export default App;
