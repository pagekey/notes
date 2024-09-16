import React from 'react';
import NoteForm from '../components/NoteForm';
import InboxList from '../components/InboxList';
import { Note } from '../models/Note';


export default function() {
    const [message, setMessage] = React.useState<string>("Loading...");
    const [notes, setNotes] = React.useState<Note[]>([]);
    React.useEffect(() => {
        fetch("http://localhost:5000/notes", {
            method: "GET",
        }).then(res => res.json()).then(res => {
            console.log('hey',res)
            setNotes(res['notes']);
        });
    }, []);
    React.useEffect(() => {
        fetch("http://localhost:5000/").then(resp => resp.json()).then(data => {
            setMessage(data.message);
        })
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
            <div>Here is a link to about: <a href="/about" style={{textDecoration: "underline"}}>About</a></div>
            <div>Message from server: {message}</div>
            <NoteForm saveNote={saveNote} />
            <InboxList notes={notes} />
            <div style={{fontWeight: 'bold'}}>Next Actions</div>
            <div style={{fontWeight: 'bold'}}>Projects</div>
        </div>
    )
};
