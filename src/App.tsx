import React from 'react';
import './App.css';
import Nav from "./components/nav";
import {Outlet} from "react-router-dom";

function App() {
    return (
        <header>
            <Nav/>
            <Outlet/>
        </header>
    );
}

export default App;
