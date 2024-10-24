import React from "react";
import {useParams} from "react-router-dom";

import NotFound from "./notFound";
import {parseMarkdown} from "../managers/markdown";
import {getNoteById} from "../managers/note";

const NoteDisplay = () => {
    const {noteId} = useParams();
    const positiveIntegerRegex = /^[1-9]\d*$/;

    const [content, setContent] = React.useState<string>("");
    const [fetchSuccess, setFetchSuccess] = React.useState<boolean>(positiveIntegerRegex.test(noteId as string));

    React.useEffect(() => {
        async function fetchContent() {
            if (!noteId) {
                setFetchSuccess(false);
                return;
            }
            const note = await getNoteById(parseInt(noteId));
            if (!note) {
                setFetchSuccess(false);
                return;
            }
            setContent(parseMarkdown(note.content));
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