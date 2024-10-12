import React from "react";

import {NoteInfo} from "../dto/note";
import NoteItem from "./noteItem";
import {getNotes} from "../managers/note";

const Notes = ({category}: { category?: string }) => {
    const [notes, setNotes] = React.useState<NoteInfo[]>([]);

    React.useEffect(() => {
        async function loadNotes() {
            const notes = await getNotes(category);
            setNotes(notes);
        }

        void loadNotes();
    }, [category]);

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