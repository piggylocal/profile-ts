import {Link} from "react-router-dom";
import {NoteInfo} from "../dto/note";

const NoteItem = ( {note}: {note: NoteInfo} ) => {
    return (
        <p><Link to={`/${note.id}`}>{note.title}</Link></p>
    )
}

export default NoteItem;
