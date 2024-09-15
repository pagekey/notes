import React from 'react';
import { Note } from '../models/Note';
import Button from '../components/std/Button';


export default () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>("");
    const [notes, setNotes] = React.useState<Note[]>([]);
    const [index, setIndex] = React.useState<number>(0);

    React.useEffect(() => {
        fetch("http://localhost:5000/notes", {
            method: "GET",
        }).then(res => res.json()).then(res => {
            setNotes(res['notes']);
            setLoading(false);
        });
    }, []);
    
    const sendTrash = (id: number) => {
        fetch("http://localhost:5000/delete_note", {
            method: "POST",
            body: JSON.stringify({
                id
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(res => {
            setIndex(index => index+1);
        });
    }

    return (
        <div>
            <div>Process Inbox</div>
            {loading ? "Loading..." : (error ? "An error occurred." : (
                index >= notes.length ? "All done!" : (
                    <>
                        <div>Reviewing note {index+1} of {notes.length}</div>
                        <div style={{fontSize: "150%"}}>{notes[index].body}</div>
                        <div>
                            <Button onClick={() => sendTrash(notes[index].id)}>Trash</Button>
                            <Button>Create action</Button>
                            <Button>Create project</Button>
                        </div>
                    </>
            )))}
        </div>
    )
}
