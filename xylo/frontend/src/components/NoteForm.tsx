import React from 'react';
import Button from './std/Button';
import TextArea from './std/TextArea';
import TextInput from './std/TextInput';


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
                <TextInput id="note_title" placeholder="Title" />
            </div>
            <div style={{display: 'block'}}>
                <TextArea id="note" placeholder="Note" />
            </div>
            <div style={{display: 'block'}}>
                <Button onClick={props.saveNote}>Save</Button>
            </div>
        </>
    )
}
