import React from 'react';


export default () => {
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
