import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import HoverImgBox from "./hoverImgBox";

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
    return (
        <div className="center">
            <ThemeProvider theme={theme}>
                <Box component="form" noValidate autoComplete="off">
                    <TextField id="login-username" label="Username" autoComplete="off"/>
                    <TextField id="login-password" label="Password" type="password" autoComplete="current-password"/>
                    <HoverImgBox surfaceImgSrc={`${process.env.PUBLIC_URL}/pignose.png`}
                                 bottomImgSrc={`${process.env.PUBLIC_URL}/pignose.gif`}/>
                </Box>
            </ThemeProvider>
        </div>
    )
}

export default Login;
