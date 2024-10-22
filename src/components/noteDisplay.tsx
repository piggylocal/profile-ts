import React from "react";
import {useParams} from "react-router-dom";

import {Note} from "../dto/note";
import NotFound from "./notFound";
import {parseMarkdown} from "../managers/markdown";

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
                setContent(parseMarkdown(note.content));
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

    if (!fetchSuccess) {
        return (
            <NotFound/>
        )
    }

    return (
        <main className="center" dangerouslySetInnerHTML={{__html: content}}>
        </main>
    )
}

export default NoteDisplay;