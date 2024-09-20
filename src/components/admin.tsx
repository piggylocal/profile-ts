import React from "react";
import {Button, Divider, Stack} from "@mui/material";
import {useLocalStorage} from "@uidotdev/usehooks";
import {useNavigate} from "react-router-dom";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {blueGrey, grey} from "@mui/material/colors";
import axios from "axios";

const theme = createTheme({
    palette: {
        primary: blueGrey,
        secondary: grey
    },
});

const Admin = () => {
    const [pv, setPV] = React.useState(0);
    const [, setToken] = useLocalStorage<string | undefined>("token", undefined);

    const navigate = useNavigate();

    function logout() {
        setToken(undefined);
        navigate("/");
    }

    async function getPV() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/user/pv`);
            if (!response.data.pv) {
                console.error("Failed to get PV count");
                return;
            }
            setPV(response.data.pv);
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        void getPV();
    }, []);

    return (
        <div className="center" style={{minWidth: "min(70%, 300px)"}}>
            <ThemeProvider theme={theme}>
                <Stack
                    direction="column"
                    spacing={1}
                    divider={<Divider flexItem/>}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <h2 style={{width: "100%", color: blueGrey[900]}}>
                        PV Count:<span style={{float: "right"}}>{pv}</span>
                    </h2>
                    <Button variant="text" onClick={logout}>Logout</Button>
                </Stack>
            </ThemeProvider>
        </div>
    )
}

export default Admin;