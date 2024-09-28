import React from "react";
import Box from "@mui/material/Box";
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import {NoteInfo} from "../dto/note";
import {getNotes} from "../managers/note";

const DeleteNoteDialog = ({open, setOpen, currentNote}: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    currentNote: NoteInfo | undefined,
}) => {
    const handleClose = () => {
        setOpen(false);
    };

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
                <Button onClick={handleClose} color="error">Delete</Button>
            </DialogActions>
        </Dialog>
    )
}

const NoteManager = () => {
    const [notes, setNotes] = React.useState<NoteInfo[]>([]);
    const [openDeleteNoteDialog, setOpenDeleteNoteDialog] = React.useState(false);
    const [currentNoteId, setCurrentNoteId] = React.useState<number | null>(null);

    const currentNote: NoteInfo | undefined = notes.find((note) => note.id === currentNoteId);

    React.useEffect(() => {
        async function loadNotes() {
            const notes = await getNotes();
            setNotes(notes);
        }

        void loadNotes();
    }, []);

    return (
        <Box sx={{width: "100%"}}>
            <Box sx={{width: "100%", marginTop: 0.5, marginBottom: 0.5}}>
                Note Count:<span style={{float: "right"}}>{notes.length}</span>
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
                                <TableCell align="center">
                                    <Button
                                        style={{minWidth: "5ch"}}
                                        onClick={() => {
                                            setCurrentNoteId(note.id);
                                            setOpenDeleteNoteDialog(true);
                                        }}
                                    >
                                        <DeleteIcon/>
                                    </Button>
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