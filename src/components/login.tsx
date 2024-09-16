import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {blueGrey, grey} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: blueGrey,
        secondary: grey,
    },
});

const Login = () => {
    return (
        <div className="center">
            <ThemeProvider theme={theme}>
                <Box component="form" noValidate autoComplete="off">
                    <TextField id="username" label="Username" autoComplete="off"/>
                    <TextField id="password" label="Password" type="password" autoComplete="current-password"/>
                    <Button variant="text">Login</Button>
                </Box>
            </ThemeProvider>
        </div>
    )
}

export default Login;
