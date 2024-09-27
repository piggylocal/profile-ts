import React from "react";

import {NoteInfo} from "../dto/note";
import NoteItem from "./noteItem";
import {getNotes} from "../managers/note";

const Notes = () => {
    const [notes, setNotes] = React.useState<NoteInfo[]>([]);

    React.useEffect(() => {
        async function loadNotes() {
            const notes = await getNotes();
            setNotes(notes);
        }

        void loadNotes();
    }, []);

    return (
        <main className="center">
            <h1>Notes</h1>
            {notes.map((note) => (
                <NoteItem note={note} key={note.id}></NoteItem>
            ))}
        </main>
    )
}

export default Notes;