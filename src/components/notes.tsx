import {notes} from "../dto/note";
import NoteItem from "./noteItem";

const Notes = () => {
    const reversedNotes = [...notes].reverse();
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