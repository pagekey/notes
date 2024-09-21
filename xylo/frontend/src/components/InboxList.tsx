import React from 'react';
import { Note } from '../models/Note';
import Link from './std/Link';
import Button from './std/Button';


interface InboxListProps {
    notes: Note[]
}
export default (props: InboxListProps) => {
    return (
        <div>
            <div style={{fontWeight: 'bold'}}>Inbox{props.notes.length > 0 ? ` (${props.notes.length})` : ""}</div>
            <ul>
                {props.notes.map(note => {
                    return <li style={{ display: "block" }}><b>{note.title}</b><br/>{note.body}</li>
                })}
            </ul>
            <Link href="/inbox/process">
                <Button>
                    Process
                </Button>
            </Link>
        </div>
    )
};
