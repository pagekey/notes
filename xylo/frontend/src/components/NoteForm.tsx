import React from 'react';
import TextInput from './std/TextInput';
import Button from './std/Button';


interface NoteFormProps {
    saveNote: Function
}
export default function(props: NoteFormProps) {
    return (
        <>
            <div style={{display: 'block'}}>
                <label style={{fontWeight: 'bold'}}>Note</label>
            </div>
            <div style={{display: 'block'}}>
                <TextInput id="note" />
            </div>
            <div style={{display: 'block'}}>
                <Button onClick={props.saveNote}>Save</Button>
            </div>
        </>
    )
}
