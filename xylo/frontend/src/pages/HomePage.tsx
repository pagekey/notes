import React from 'react';
import NoteForm from '../components/NoteForm';
import InboxList from '../components/InboxList';
import { Note } from '../models/Note';
import Link from '../components/std/Link';


export default function() {
    const [notes, setNotes] = React.useState<Note[]>([]);
    React.useEffect(() => {
        fetch("http://localhost:5000/notes", {
            method: "GET",
        }).then(res => res.json()).then(res => {
            console.log('hey',res)
            setNotes(res['notes']);
        });
    }, []);
    const saveNote = () => {
        const noteElem = document.getElementById("note");
        const noteBody = noteElem.value;
        if (noteBody.length < 1) {
            return;
        }
        fetch("http://localhost:5000/save_note", {
            method: "POST",
            body: JSON.stringify({
                note: noteBody
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            noteElem.value = "";
            setNotes(notes => [...notes, {id: undefined, body: noteBody, created: undefined, updated: undefined}])
        });
    };
    return (
        <div>
            <div style={{fontSize: "150%"}}>PageKey Tasks</div>
            <div style={{fontWeight: "bold"}}>Home</div>
            <div><Link href="/about">About</Link></div>
            <NoteForm saveNote={saveNote} />
            <InboxList notes={notes} />
            <div style={{fontWeight: 'bold'}}>Next Actions</div>
            <div style={{fontWeight: 'bold'}}>Projects</div>
        </div>
    )
};
