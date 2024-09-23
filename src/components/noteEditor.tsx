import React from "react";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';

import "../styles/editor.css";
import {MilkdownEditorWrapper} from "./milkdownEditorWrapper";
import NoteMarkdown from "./noteMarkdown";

const NoteEditor = () => {
    const [value, setValue] = React.useState('wysiwyg');
    const [activePanelValue, setActivePanelValue] = React.useState('wysiwyg');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setActivePanelValue(newValue);
        setTimeout(() => {
            setValue(newValue);
        }, 10);
    };

    return (
        <main className="editor center">
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="editor tabs">
                        <Tab label="WYSIWYG" value="wysiwyg" />
                        <Tab label="Markdown" value="markdown" />
                    </TabList>
                </Box>
                <TabPanel value="wysiwyg">
                    <MilkdownEditorWrapper activePanelValue={activePanelValue}/>
                </TabPanel>
                <TabPanel value="markdown">
                    <NoteMarkdown activePanelValue={activePanelValue}/>
                </TabPanel>
            </TabContext>
        </main>
    )
}

export default NoteEditor;