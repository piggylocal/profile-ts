import purify from "dompurify";
import markdownit from 'markdown-it';
import React from "react";
import {useParams} from "react-router-dom";
import hljs from "highlight.js";
import {Note} from "../dto/note";
import NotFound from "./notFound";

const NoteDisplay = () => {
    const {noteId} = useParams();
    const positiveIntegerRegex = /^[1-9]\d*$/;

    const [content, setContent] = React.useState<string>("");
    const [fetchSuccess, setFetchSuccess] = React.useState<boolean>(positiveIntegerRegex.test(noteId as string));

    React.useEffect(() => {
        async function fetchContent() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API}/note/${noteId}`);
                if (!response.ok) {
                    console.error("Failed to fetch note content");
                    setFetchSuccess(false);
                    return;
                }
                const note = await response.json() as Note;
                const renderedText = markdownit().render(note.content);
                setContent(renderedText);
            } catch (error) {
                console.error(error);
                setFetchSuccess(false);
            }
        }

        if (!fetchSuccess) {
            return;
        }

        void fetchContent();
    }, [noteId, fetchSuccess]);

    React.useEffect(() => {
        const codeBlocks = document.querySelectorAll("pre code");
        codeBlocks.forEach((block) => {
            hljs.highlightElement(block as HTMLElement);
        });
    });

    if (!fetchSuccess) {
        return (
            <NotFound/>
        )
    }

    return (
        <main className="center" dangerouslySetInnerHTML={{__html: purify.sanitize(content)}}>
        </main>
    )
}

export default NoteDisplay;