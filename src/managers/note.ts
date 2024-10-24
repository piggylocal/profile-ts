import axios from "axios";

import {Note, NoteInfo} from "../dto/note";

export async function getNotes(category?: string): Promise<NoteInfo[]> {
    let url = `${process.env.REACT_APP_API}/note`;
    if (category) {
        url += `/categories/${category}`;
    }
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getNoteById(noteId: number): Promise<Note | undefined> {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/note/${noteId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}