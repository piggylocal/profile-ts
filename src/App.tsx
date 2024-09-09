import React from 'react';
import './App.css';
import Nav from "./components/nav";
import {Outlet, useLocation} from "react-router-dom";

function App() {
    const location = useLocation();
    React.useEffect(() => {
        console.log(location);
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
