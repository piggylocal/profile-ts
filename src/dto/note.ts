type Note = {
    id: number;
    author: string;
    title: string;
    path: string;
    categories: string[];
    keywords: string[];
}

export type {Note};
export const notes: Note[] = [
    {
        id: 1,
        author: "acst",
        title: "Test Note",
        path: "testNote.md",
        categories: ["test"],
        keywords: ["test"]
    },
    {
        id: 2,
        author: "acst",
        title: "Test Note 2",
        path: "testNote2.md",
        categories: ["test"],
        keywords: ["test"]
    }
];