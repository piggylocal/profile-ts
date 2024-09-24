import React from "react";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';

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
        </main>
    )
}

export default NoteEditor;