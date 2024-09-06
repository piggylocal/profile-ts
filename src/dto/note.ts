type Note = {
    id: number;
    author: string;
    title: string;
    categories: string[];
    keywords: string[];
    content: string;
}

export type {Note};
export const notes: Note[] = [
    /* {
        id: 1,
        author: "acst",
        title: "Test Note",
        categories: ["test"],
        keywords: ["test"]
    }, */
    {
        id: 2,
        author: "acst",
        title: "蛇和包子过新年",
        categories: ["test"],
        keywords: ["test"],
        content: "蛇和包子过新年"
    },
    {
        id: 3,
        author: "acst",
        title: "Access Your Device Anywhere with SSH Reverse Tunneling",
        categories: ["CS", "Networking"],
        keywords: ["Reverse Tunneling", "SSH", "Networking", "AWS"],
        content: "Access Your Device Anywhere with SSH Reverse Tunneling"
    }
];