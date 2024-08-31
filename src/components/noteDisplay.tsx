import purify from "dompurify";
import markdownit from 'markdown-it';
import React from "react";
import {useParams} from "react-router-dom";
import {notes} from "../dto/note";

const NoteDisplay = () => {
    const {noteIdStr} = useParams();
    const noteId = parseInt(noteIdStr as string);
    let i = 0;
    while (i < notes.length && notes[i].id !== noteId) i++;
    const note = i < notes.length ? notes[i] : null;

    const [content, setContent] = React.useState<string>("");

    React.useEffect(() => {
        async function fetchContent() {
            if (note === null) {
                return;
            }

            try {
                const response = await fetch(`${process.env.PUBLIC_URL}/notes/${note.path}`);
                if (!response.ok) {
                    console.log("Failed to fetch note content");
                }
                const text = await response.text();
                setContent(markdownit().render(text));
            } catch (error) {
                console.error(error);
            }
        }

        void fetchContent();
    }, [note]);

    return (
        <main className="center" dangerouslySetInnerHTML={{__html: purify.sanitize(content)}}>
        </main>
    )
}

export default NoteDisplay;