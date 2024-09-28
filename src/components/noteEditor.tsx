import React from "react";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import {Button, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";

import "../styles/editor.css";
import {MilkdownEditorWrapper} from "./milkdownEditorWrapper";
import NoteMarkdown from "./noteMarkdown";

const TabPanel = ({children, value, name}: {children: React.ReactNode, value: string, name: string}) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== name}
            aria-labelledby={`editor-tab-${name}`}
        >
            <Box sx={{ paddingTop: 3, paddingBottom: 3 }}>
                {children}
            </Box>
        </div>
    )
}

const NoteEditor = () => {
    const [value, setValue] = React.useState('wysiwyg');

    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <main className="editor center">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="editor tabs">
                    <Tab label="WYSIWYG" value="wysiwyg" />
                    <Tab label="Markdown" value="markdown" />
                </Tabs>
            </Box>
            <TabPanel name="wysiwyg" value={value}>
                <MilkdownEditorWrapper activePanelValue={value}/>
            </TabPanel>
            <TabPanel name="markdown" value={value}>
                <NoteMarkdown activePanelValue={value}/>
            </TabPanel>
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
                    onClick={() => navigate("..")}
                >
                    Back
                </Button>
                <Button variant="outlined" color="secondary">Save draft</Button>
                <Button variant="outlined">Next</Button>
            </Stack>
        </main>
    )
}

export default NoteEditor;