import React from "react";
import StatusCodes from "http-status-codes";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Alert} from "@mui/material";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";

import HoverImgBox from "./hoverImgBox";

enum LoginError {
    NONE,
    MISMATCH,

    UNKNOWN
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#f06292"
        },
        secondary: {
            main: "#ffb74d"
        },
    },
});

const Login = () => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loginError, setLoginError] = React.useState<LoginError>(LoginError.NONE);
    const [, setToken] = useLocalStorage<string | undefined>("token", undefined);

    const passwordRef = React.useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    async function getToken(username: string, password: string) {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/user/login`,
                {username, password}
            );
            if (!response.data.token) {
                setLoginError(LoginError.UNKNOWN);
                console.error("Failed to get token");
                return;
            }
            setLoginError(LoginError.NONE);
            setToken(response.data.token);
            navigate("/admin");
        } catch (error) {
            if (!axios.isAxiosError(error) || !error.response) {
                setLoginError(LoginError.UNKNOWN);
                console.error(error);
                return;
            }
            if (error.response.status === StatusCodes.UNAUTHORIZED) {
                setLoginError(LoginError.MISMATCH);
                return;
            }
            setLoginError(LoginError.UNKNOWN);
        }
    }

    return (
        <div className="center">
            <ThemeProvider theme={theme}>
                <Box component="form" noValidate autoComplete="off">
                    <Alert
                        id="login-mismatch"
                        className={loginError === LoginError.MISMATCH ? "" : "hidden"}
                        severity="error"
                        style={{width: "100%"}}
                    >
                        Incorrect username or password.
                    </Alert>
                    <Alert
                        id="login-unknown"
                        className={loginError === LoginError.UNKNOWN ? "" : "hidden"}
                        severity="error"
                        style={{width: "100%"}}
                    >
                        Unknown error occurred.
                    </Alert>
                    <TextField
                        id="login-username"
                        label="Username"
                        type="email"
                        autoComplete="username"
                        slotProps={{
                            htmlInput: {
                                enterKeyHint: password ? "go" : "next"
                            }
                        }}
                        onChange={(event) => setUsername(event.target.value)}
                        onKeyUp={(event) => {
                            if (event.key !== "Enter") {
                                return;
                            }
                            if (password) {
                                void getToken(username, password);
                                return;
                            }
                            if (passwordRef.current) {
                                passwordRef.current.focus();
                            }
                        }}
                    />
                    <TextField
                        id="login-password"
                        inputRef={passwordRef}
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        slotProps={{
                            htmlInput: {
                                enterKeyHint: "go",
                            }
                        }}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyUp={(event) => {
                            if (event.key === "Enter") {
                                void getToken(username, password);
                            }
                        }}
                    />
                    <HoverImgBox
                        surfaceImgSrc={`${process.env.PUBLIC_URL}/pignose.png`}
                        bottomImgSrc={`${process.env.PUBLIC_URL}/pignose.gif`}
                        onSubmit={getToken}
                        username={username}
                        password={password}
                    />
                </Box>
            </ThemeProvider>
        </div>
    )
}

export default Login;
