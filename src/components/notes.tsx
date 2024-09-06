import React from "react";

import {Note} from "../dto/note";
import NoteItem from "./noteItem";

const Notes = () => {
    const [notes, setNotes] = React.useState<Note[]>([]);
    const reversedNotes = [...notes].reverse();

    React.useEffect(() => {
       async function fetchNotes() {
           try {
               const response = await fetch(`${process.env.REACT_APP_API}/note`);
               if (!response.ok) {
                   console.log("Failed to fetch notes");
               }
               const notes = await response.json() as Note[];
               setNotes(notes);
           } catch (error) {
               console.error(error);
           }
       }

       void fetchNotes();
    });

    return (
        <main className="center">
            <h1>Notes</h1>
            {reversedNotes.map((note) => (
                <NoteItem note={note} key={note.id}></NoteItem>
            ))}
        </main>
    )
}

export default Notes;