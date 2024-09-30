import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Button, Stack} from "@mui/material";
import {useNavigate, useLocation} from "react-router-dom";

import "../styles/noteMetaForm.css";

function inferTitleFromContent(content: string): string {
    const lines = content.split("\n");
    for (const line of lines) {
       const trimmed = line.trim();
       if (trimmed.startsWith("# ")) {
           return trimmed.substring(2).trim();
       }
    }
    return "";
}

const NoteMetaForm = () => {
    const content = JSON.parse(localStorage.getItem("content") || '""') as string;
    const defaultTitle = inferTitleFromContent(content);

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box className="center">
            <Box component="form" noValidate autoComplete="off" style={{width: "100%"}}>
                <p>Enter your note metadata:</p>
                <TextField label="Title" name="title" defaultValue={defaultTitle}/>
                <TextField label="Author" name="author" defaultValue={"acst"}/>
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