import React from "react";
import {useLocalStorage} from "@uidotdev/usehooks";
import CodeMirror from '@uiw/react-codemirror';
import {markdown, markdownLanguage} from '@codemirror/lang-markdown';
import {languages} from '@codemirror/language-data';

const NoteMarkdown = ({activePanelValue}: { activePanelValue: string }) => {
    const [content, setContent] = useLocalStorage("content", "");
    const [code, setCode] = React.useState<string>("");

    React.useEffect(() => {
        setCode(content);
    }, [content, setCode]);
    React.useEffect(() => {
        if (activePanelValue === "markdown") {
            return;
        }
        console.log(code);
        setContent(code);
    }, [activePanelValue, code, setContent])

    return (
        /*<TextField
            inputRef={ref}
            label="Markdown"
            multiline
            rows={20}
            fullWidth={true}
        />*/
        <CodeMirror
            value={code}
            onChange={(value) => setCode(value)}
            extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
        />
    )
};

export default NoteMarkdown;