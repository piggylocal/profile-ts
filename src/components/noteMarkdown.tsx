import React from "react";
import TextField from "@mui/material/TextField";
import {useLocalStorage} from "@uidotdev/usehooks";

const NoteMarkdown = ({activePanelValue}: {activePanelValue: string}) => {
    const ref = React.useRef<HTMLTextAreaElement>(null);
    const [content, setContent] = useLocalStorage("content", "");

    React.useEffect(() => {
        let element = ref.current;
        if (element === null) {
            return;
        }
        element.value = content;
        element.focus();
    }, [content]);
    React.useEffect(() => {
        if (activePanelValue === "markdown") {
            return;
        }
        setContent(ref.current?.value ?? "");
    }, [activePanelValue, setContent])

    return (
        <TextField
            inputRef={ref}
            label="Markdown"
            multiline
            fullWidth={true}
        />
    )
};

export default NoteMarkdown;