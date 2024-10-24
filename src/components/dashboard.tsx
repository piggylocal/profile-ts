import React from "react";
import {Button, Stack} from "@mui/material";
import {useLocalStorage} from "@uidotdev/usehooks";
import {useNavigate} from "react-router-dom";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {blueGrey, grey} from "@mui/material/colors";
import axios from "axios";
import Box from "@mui/material/Box";

import NoteManager from "./noteManager";
import GoogleOAuthWrapper from "./googleOAuthWrapper";
import {googleBloggerScope} from "../configs/google";
import Snackbar, {SnackbarCloseReason} from "@mui/material/Snackbar";

const theme = createTheme({
    palette: {
        primary: blueGrey,
        secondary: grey
    },
});

const DashboardItem = ({children}: { children: React.ReactNode }) => {
    return (
        <Box className="dashboard-item" sx={{width: "100%"}}>
            {children}
        </Box>
    )
}

const Dashboard = () => {
    const [pv, setPV] = React.useState(0);
    const [, setToken] = useLocalStorage<string | undefined>("token", undefined);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState("");

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

    const handleSnackbarClose = (
        _: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    }

    React.useEffect(() => {
        void getPV();
    }, []);

    return (
        <>
            <div className="center">
                <ThemeProvider theme={theme}>
                    <Stack
                        className="dashboard-stack"
                        direction="column"
                        spacing={1}
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <DashboardItem>
                            <GoogleOAuthWrapper specifiedScopes={[googleBloggerScope]}>
                                <NoteManager
                                    setSnackbarOpen={setSnackbarOpen}
                                    setSnackbarMessage={setSnackbarMessage}
                                />
                            </GoogleOAuthWrapper>
                        </DashboardItem>
                        <DashboardItem>
                            PV Count:<span style={{float: "right"}}>{pv}</span>
                        </DashboardItem>
                        <Button variant="text" onClick={logout}>Logout</Button>
                    </Stack>
                </ThemeProvider>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </>
    )
}

export default Dashboard;