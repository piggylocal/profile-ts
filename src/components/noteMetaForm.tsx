import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Button, Stack} from "@mui/material";
import {useNavigate, useLocation} from "react-router-dom";

import "../styles/noteMetaForm.css";

const NoteMetaForm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box className="center">
            <Box component="form" noValidate autoComplete="off" style={{width: "100%"}}>
                <p>Enter your note metadata:</p>
                <TextField label="Title" name="title"/>
                <TextField label="Author" name="author"/>
                <TextField label="Keywords (comma-separated)" name="keywords"/>
                <TextField label="Categories (comma-separated)" name="categories"/>
                <Stack
                    className="button-panel"
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <Button
                        variant="outlined"
                        style={{marginRight: "auto"}}
                        onClick={() => navigate(`${location.pathname}/../editor`)}
                    >
                        Back
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                    >
                        Submit
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default NoteMetaForm;