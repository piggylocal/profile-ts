import purify from "dompurify";
import markdownit from 'markdown-it';
import React from "react";
import {useParams} from "react-router-dom";
import hljs from "highlight.js";
import {Note} from "../dto/note";

const NoteDisplay = () => {
    const {noteId} = useParams();
    const [content, setContent] = React.useState<string>("");

    React.useEffect(() => {
        async function fetchContent() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API}/note/${noteId}`);
                if (!response.ok) {
                    console.log("Failed to fetch note content");
                }
                const note = await response.json() as Note;
                const renderedText = markdownit().render(note.content);
                setContent(renderedText);
            } catch (error) {
                console.error(error);
            }
        }

        void fetchContent();
    }, [noteId]);

    React.useEffect(() => {
        const codeBlocks = document.querySelectorAll("pre code");
        codeBlocks.forEach((block) => {
            hljs.highlightElement(block as HTMLElement);
        });
    });

    return (
        <main className="center" dangerouslySetInnerHTML={{__html: purify.sanitize(content)}}>
        </main>
    )
}

export default NoteDisplay;