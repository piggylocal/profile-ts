import React from "react";

import {NoteInfo} from "../dto/note";
import NoteItem from "./noteItem";

const Notes = () => {
    const [notes, setNotes] = React.useState<NoteInfo[]>([]);

    React.useEffect(() => {
       async function fetchNotes() {
           try {
               const response = await fetch(`${process.env.REACT_APP_API}/note`);
               if (!response.ok) {
                   console.log("Failed to fetch notes");
               }
               const notes = await response.json() as NoteInfo[];
               setNotes(notes);
           } catch (error) {
               console.error(error);
           }
       }

       void fetchNotes();
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