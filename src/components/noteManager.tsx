import React, {useContext} from "react";
import Box from "@mui/material/Box";
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShareIcon from '@mui/icons-material/Share';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Tooltip from '@mui/material/Tooltip';

import {NoteInfo} from "../dto/note";
import {getNoteById, getNotes} from "../managers/note";
import {GoogleOAuthContext} from "../contexts/googleOAuthContext";
import {areCredentialsValid} from "../managers/googleOAuth";
import {blogId, googleBloggerScope} from "../configs/google";
import {parseMarkdown} from "../managers/markdown";
import {LoadingContext} from "../contexts/loadingContext";

type Task = () => void | Promise<void>;

const DeleteNoteDialog = ({open, setOpen, currentNote}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    currentNote: NoteInfo | undefined,
}) => {
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        if (!currentNote) {
            return;
        }
        try {
            await axios.delete(`${process.env.REACT_APP_API}/note/${currentNote.id}`);
        } catch (error) {
            console.error(error);
        }
        handleClose();
        window.location.reload();   // refresh the page to reflect the deletion
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-note-dialog"
        >
            <DialogTitle>Delete this note?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    The note "{currentNote?.title}" will be permanently deleted.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus={true}>Cancel</Button>
                <Button onClick={handleDelete} color="error">Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

const NoteManager = ({setSnackbarOpen, setSnackbarMessage}: {
    setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>,
}) => {
    const [notes, setNotes] = React.useState<NoteInfo[]>([]);
    const [openDeleteNoteDialog, setOpenDeleteNoteDialog] = React.useState(false);
    const [currentNoteId, setCurrentNoteId] = React.useState<number | null>(null);
    const scheduledTask = React.useRef<Task | null>(null);
    const navigate = useNavigate();
    const {login: googleLogin, credentials: googleCredentials} = useContext(GoogleOAuthContext);
    const {setLoading} = useContext(LoadingContext);

    const currentNote: NoteInfo | undefined = notes.find((note) => note.id === currentNoteId);

    async function postBlogger(note: NoteInfo) {
        setLoading(true);

        const fullNote = await getNoteById(note.id);
        if (!fullNote) {
            setLoading(false);
            setSnackbarOpen(true);
            setSnackbarMessage(`Failed to get the note content for "${note.title}".`);
            return;
        }

        // Add a link to the original note at the end of the content.
        const originalLink = `acst.me/${note.id}`;
        let content = fullNote.content;
        content += "\n\n";
        content += `Originally posted on [${originalLink}](https://${originalLink}).`;

        // Remove the first h1 title from the content, for there is a separate title field in Blogger.
        const lines = content.split("\n");
        for (const [i, line] of lines.entries()) {
            const trimmed = line.trim();
            if (trimmed.startsWith("# ")) {
                lines[i] = "";
                break;
            }
        }
        content = lines.join("\n");

        let snackbarMessage: string;
        try {
            await axios.post(
                `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`,
                {
                    kind: "blogger#post",
                    blog: {
                        id: blogId,
                    },
                    title: note.title,
                    content: parseMarkdown(content),
                    labels: note.categories,
                },
                {
                    headers: {Authorization: `Bearer ${googleCredentials?.access_token}`},
                }
            )
            snackbarMessage = `Successfully posted "${note.title}" to Blogger!`;
        } catch (error) {
            console.error(error);
            snackbarMessage = `Failed to post "${note.title}" to Blogger.`;
        }

        setLoading(false);
        setSnackbarOpen(true);
        setSnackbarMessage(snackbarMessage);
    }

    function createPostBloggerTask(note: NoteInfo): Task {
        return postBlogger.bind(null, note);
    }

    React.useEffect(() => {
        async function loadNotes() {
            const notes = await getNotes();
            setNotes(notes);
        }

        void loadNotes();
    }, []);

    React.useEffect(() => {
        if (!googleCredentials || !areCredentialsValid(googleCredentials, [googleBloggerScope])) {
            return;
        }
        if (!scheduledTask.current) {
            return;
        }
        // Execute the scheduled task if the credentials are valid.
        const currentTask = scheduledTask.current;
        scheduledTask.current = null;
        void currentTask();
    }, [googleCredentials]);

    return (
        <Box sx={{width: "100%"}}>
            <Box sx={{
                width: "100%",
                marginTop: 0.5,
                marginBottom: 0.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                Note Count:
                <Box sx={{
                    float: "right",
                    display: "flex",
                    alignItems: "center",
                    marginRight: 2,
                }}>
                    {notes.length}
                    <Tooltip title="New Note">
                        <IconButton
                            style={{marginLeft: 4, marginRight: -4}}
                            onClick={() => navigate("editor")}
                        >
                            <AddCircleIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <TableContainer component={Box} sx={{marginTop: 1.5}}>
                <Table sx={{minWidth: 400}} size="small" aria-label="note table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Manage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {notes.map((note) => (
                            <TableRow key={note.id}
                                      sx={{'&:last-child td, &:last-child th': {border: 0, paddingBottom: 0}}}>
                                <TableCell component="th" scope="row">{note.title}</TableCell>
                                <TableCell align="center" sx={{minWidth: 120}}>
                                    <Tooltip title="Repost to Blogger" sx={{mr: 0.5}}>
                                        <IconButton
                                            onClick={async () => {
                                                const task = createPostBloggerTask(note);
                                                if (googleCredentials && areCredentialsValid(
                                                    googleCredentials, [googleBloggerScope]
                                                )) {
                                                    void task();
                                                    return;
                                                }
                                                scheduledTask.current = task;
                                                googleLogin();
                                            }}
                                        >
                                            <ShareIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            onClick={() => {
                                                setCurrentNoteId(note.id);
                                                setOpenDeleteNoteDialog(true);
                                            }}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DeleteNoteDialog
                open={openDeleteNoteDialog}
                setOpen={setOpenDeleteNoteDialog}
                currentNote={currentNote}
            />
        </Box>
    )
};

export default NoteManager;