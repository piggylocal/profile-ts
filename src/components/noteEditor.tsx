import React from "react";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import {Button, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";

import "../styles/editor.css";
import {MilkdownEditorWrapper} from "./milkdownEditorWrapper";
import NoteMarkdown from "./noteMarkdown";
import {EditorTarget} from "../configs/note";

const TabPanel = ({children, value, editorType}: {
    children: React.ReactNode,
    value: EditorTarget,
    editorType: EditorTarget
}) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== editorType}
            aria-labelledby={`editor-tab-${editorType}`}
        >
            <Box sx={{ paddingTop: 3, paddingBottom: 3 }}>
                {children}
            </Box>
        </div>
    )
}

const NoteEditor = () => {
    const [contentStore, setContentStore] = useLocalStorage<string | undefined>("content", undefined);

    // Current active (visible) editor.
    const [value, setValue] = React.useState<EditorTarget>(EditorTarget.WYSIWYG);
    const [content, setContent] = React.useState<string>(contentStore || "");
    // The target we are going to activate. Not necessarily an editor (can also be
    // "BACK" page, "NEXT" page, etc.). The rule is that we MUST finish all the
    // state transitions before we actually navigate to the target. After we navigate
    // to the target, NO state transition is allowed.
    const [target, setTarget] = React.useState<EditorTarget>(EditorTarget.INIT);

    const navigate = useNavigate();

    const handleChange = (_: React.SyntheticEvent, newValue: EditorTarget) => {
        setTarget(newValue);
    };

    // Store the content to local storage. This must be called after the content
    // is updated.
    const storeContent = () => {
        setContentStore(content);
        setTarget(value);
    }

    return (
        <main className="editor center">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="editor tabs">
                    <Tab label="WYSIWYG" value={EditorTarget.WYSIWYG} />
                    <Tab label="Markdown" value={EditorTarget.MARKDOWN} />
                </Tabs>
            </Box>
            <TabPanel editorType={EditorTarget.WYSIWYG} value={value}>
                <MilkdownEditorWrapper
                    target={target}
                    setTarget={setTarget}
                    content={content}
                    setContent={setContent}
                    editorValue={value}
                    setEditorValue={setValue}
                    storeContent={storeContent}
                />
            </TabPanel>
            <TabPanel editorType={EditorTarget.MARKDOWN} value={value}>
                <NoteMarkdown
                    target={target}
                    setTarget={setTarget}
                    content={content}
                    setContent={setContent}
                    editorValue={value}
                    setEditorValue={setValue}
                    storeContent={storeContent}
                />
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
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setTarget(EditorTarget.DRAFT)}
                >
                    Save draft
                </Button>
                <Button variant="outlined">Next</Button>
            </Stack>
        </main>
    )
}

export default NoteEditor;