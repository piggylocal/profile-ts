import React, {useEffect} from "react";
import CodeMirror, {EditorView} from '@uiw/react-codemirror';
import {markdown, markdownLanguage} from '@codemirror/lang-markdown';
import {languages} from '@codemirror/language-data';

import {EditorTarget} from "../configs/note";

const NoteMarkdown = ({target, setTarget, content, setContent, editorValue, setEditorValue, storeContent}: {
    target: EditorTarget,
    setTarget: React.Dispatch<React.SetStateAction<EditorTarget>>,
    content: string,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    editorValue: EditorTarget,
    setEditorValue: React.Dispatch<React.SetStateAction<EditorTarget>>,
    storeContent: () => void,
}) => {
    const [code, setCode] = React.useState<string>(JSON.parse(localStorage.getItem("content") || '""'));

    useEffect(() => {
        if (target === EditorTarget.MARKDOWN && editorValue === EditorTarget.MARKDOWN) {
            return;
        }
        if (target === EditorTarget.INIT) {
            setCode(content);
            setTarget(EditorTarget.MARKDOWN);
            return;
        }
        if (target === EditorTarget.MARKDOWN) {
            setCode(content);
            return;
        }
        if (editorValue === EditorTarget.MARKDOWN) {
            if (code !== content) {
                setContent(code);
                return;
            }
            if (target === EditorTarget.WYSIWYG) {
                setEditorValue(EditorTarget.WYSIWYG);
            } else if (target === EditorTarget.DRAFT || target === EditorTarget.BACK || target === EditorTarget.NEXT) {
                storeContent();
            }
        }
    }, [code, setCode, target, setTarget, content, setContent, editorValue, setEditorValue, storeContent]);

    return (
        <CodeMirror
            value={code}
            onChange={(value) => {
                setCode(value);
            }}
            extensions={[
                markdown({base: markdownLanguage, codeLanguages: languages}),
                EditorView.lineWrapping,
            ]}
        />
    )
};

export default NoteMarkdown;