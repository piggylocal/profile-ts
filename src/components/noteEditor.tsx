import React from "react";
import {MilkdownEditorWrapper} from "./milkdownEditorWrapper";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";

import "../styles/editor.css";

const NoteEditor = () => {
    const [value, setValue] = React.useState('wysiwyg');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <main className="editor">
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="editor tabs">
                        <Tab label="WYSIWYG" value="wysiwyg" />
                        <Tab label="Markdown" value="markdown" />
                    </TabList>
                </Box>
                <TabPanel value="wysiwyg">
                    <MilkdownEditorWrapper/>
                </TabPanel>
                <TabPanel value="markdown">
                    <TextField
                        label="Markdown"
                        multiline
                        fullWidth={true}
                    />
                </TabPanel>
            </TabContext>
        </main>
    )
}

export default NoteEditor;