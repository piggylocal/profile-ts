import axios from "axios";

import {NoteInfo} from "../dto/note";

export async function getNotes(): Promise<NoteInfo[]> {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/note`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}