import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Alert, Button, Stack} from "@mui/material";
import {useNavigate, useLocation} from "react-router-dom";
import axios from "axios";

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

function splitStringByComma(input: string): string[] {
    return input.split(",").map((item) => item.trim()).filter((item) => item !== "");
}

const NoteMetaForm = () => {
    const content = JSON.parse(localStorage.getItem("content") || '""') as string;
    const defaultTitle = inferTitleFromContent(content);

    const [title, setTitle] = React.useState<string>(defaultTitle);
    const [author, setAuthor] = React.useState<string>("acst");
    const [submitError, setSubmitError] = React.useState<boolean>(false);

    const titleValid = title !== "";
    const authorValid = author !== "";

    const navigate = useNavigate();
    const location = useLocation();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!titleValid || !authorValid) {
            return;
        }

        const note = {
            author: author,
            title: title,
            keywords: splitStringByComma((event.target as HTMLFormElement).keywords.value),
            categories: splitStringByComma((event.target as HTMLFormElement).categories.value),
            content: content,
        }

        try {
            await axios.post(`${process.env.REACT_APP_API}/note`, note);
            localStorage.removeItem("content");
            navigate(`${location.pathname}/..`);
        } catch (error) {
            console.error(error);
            setSubmitError(true);
            return;
        }
    }

    return (
        <Box className="center">
            <Box component="form" noValidate autoComplete="off" style={{width: "100%"}} onSubmit={handleSubmit}>
                <Alert
                    id="submit-error"
                    className={submitError ? "" : "hidden"}
                    severity="error"
                    style={{width: "100%"}}
                >
                    Submit failed.
                </Alert>
                <p>Enter your note metadata:</p>
                <TextField
                    label="Title"
                    name="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    error={!titleValid}
                    helperText={titleValid ? "" : "Title cannot be empty."}
                />
                <TextField
                    label="Author"
                    name="author"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    error={!authorValid}
                    helperText={authorValid ? "" : "Author cannot be empty."}
                />
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
                        type="submit"
                    >
                        Submit
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default NoteMetaForm;
export {splitStringByComma};