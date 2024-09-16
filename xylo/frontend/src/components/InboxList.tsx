import React from 'react';
import { Note } from '../models/Note';


interface InboxListProps {
    notes: Note[]
}
export default (props: InboxListProps) => {
    return (
        <div>
            <div style={{fontWeight: 'bold'}}>Inbox{props.notes.length > 0 ? ` (${props.notes.length})` : ""}</div>
            <ul>
                {props.notes.map(note => {
                    return <li style={{ display: "block" }}>{note.body}</li>
                })}
            </ul>
            <a href="/inbox/process">
                <button style={{backgroundColor: 'blue', borderRadius: '5px', padding: '5px', color: 'white'}}>Process</button>
            </a>
        </div>
    )
};
