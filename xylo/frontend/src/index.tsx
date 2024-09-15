import React from 'react';


export const InboxProcessPage = () => {
    return (
        <div>
            Process inbox page
        </div>
    )
}

const InboxList = () => {
    const [notes, setNotes] = React.useState<string[]>([]);
    React.useEffect(() => {
        fetch("http://localhost:5000/notes", {
            method: "GET",
        }).then(res => res.json()).then(res => {
            setNotes(res['notes']);
        });
    }, []);
    return (
        <div>
            <div style={{fontWeight: 'bold'}}>Inbox{notes.length > 0 ? ` (${notes.length})` : ""}</div>
            <ul>
                {notes.map(note => {
                    return <li style={{ display: "block" }}>{note}</li>
                })}
            </ul>
            <a href="/inbox/process">
                <button style={{backgroundColor: 'blue', borderRadius: '5px', padding: '5px', color: 'white'}}>Process</button>
            </a>
        </div>
    )
};


const NoteForm = function() {
    const saveNote = () => {
        const noteBody = document.getElementById("note").value;
        fetch("http://localhost:5000/save_note", {
            method: "POST",
            body: JSON.stringify({
                note: noteBody
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };
    return (
        <>
            <div style={{display: 'block'}}>
                <label style={{fontWeight: 'bold'}}>Note</label>
            </div>
            <div style={{display: 'block'}}>
                <input id="note" style={{border: '1px solid black'}} />
            </div>
            <div style={{display: 'block'}}>
                <button onClick={saveNote} style={{backgroundColor: 'blue', borderRadius: '5px', padding: '5px', color: 'white'}}>Save</button>
            </div>
        </>
    )
}

export const HomePage = function() {
    const [message, setMessage] = React.useState<string>("Loading...");
    React.useEffect(() => {
        fetch("http://localhost:5000/").then(resp => resp.json()).then(data => {
            setMessage(data.message);
        })
    }, []);
    return (
        <div>
            <div style={{fontSize: "150%"}}>PageKey Tasks</div>
            <div style={{fontWeight: "bold"}}>Home</div>
            <div>Here is a link to about: <a href="/about" style={{textDecoration: "underline"}}>About</a></div>
            <div>Message from server: {message}</div>
            <NoteForm />
            <InboxList />
            <div style={{fontWeight: 'bold'}}>Next Actions</div>
            <div style={{fontWeight: 'bold'}}>Projects</div>
        </div>
    )
};

export const AboutPage = function() {
    return (
        <div>
            ABOUT! Hello Xylo. <a href="/">Home page here.</a>
        </div>
    )
};
