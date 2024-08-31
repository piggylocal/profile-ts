import {Link} from "react-router-dom";
import {Note} from "../dto/note";

const NoteItem = ( {note}: {note: Note} ) => {
    return (
        <p><Link to={`/notes/${note.id}`}>{note.title}</Link></p>
    )
}

export default NoteItem;
