import React from 'react';
import { Note } from '../models/Note';


export default () => {
    const [error, setError] = React.useState<string>("");
    const [notes, setNotes] = React.useState<Note[]>([]);
    
    return (
        <div>
            Process inbox page
        </div>
    )
}
