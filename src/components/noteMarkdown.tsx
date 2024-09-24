import React from "react";
import {useLocalStorage} from "@uidotdev/usehooks";
import CodeMirror, {EditorView} from '@uiw/react-codemirror';
import {markdown, markdownLanguage} from '@codemirror/lang-markdown';
import {languages} from '@codemirror/language-data';

const NoteMarkdown = ({activePanelValue}: { activePanelValue: string }) => {
    const [content, setContent] = useLocalStorage("content", "");
    const [code, setCode] = React.useState<string>(JSON.parse(localStorage.getItem("content") || '""'));

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
        <CodeMirror
            value={code}
            onChange={(value) => setCode(value)}
            extensions={[
                markdown({ base: markdownLanguage, codeLanguages: languages }),
                EditorView.lineWrapping,
            ]}
        />
    )
};

export default NoteMarkdown;