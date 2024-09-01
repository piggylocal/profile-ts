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
    /* {
        id: 1,
        author: "acst",
        title: "Test Note",
        path: "testNote.md",
        categories: ["test"],
        keywords: ["test"]
    }, */
    {
        id: 2,
        author: "acst",
        title: "蛇和包子过新年",
        path: "testNote2.md",
        categories: ["test"],
        keywords: ["test"]
    },
    {
        id: 3,
        author: "acst",
        title: "Access Your Device Anywhere with SSH Reverse Tunneling",
        path: "SSH-reverse-tunneling.md",
        categories: ["CS", "Networking"],
        keywords: ["Reverse Tunneling", "SSH", "Networking", "AWS"]
    }
];