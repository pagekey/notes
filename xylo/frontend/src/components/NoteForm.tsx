import React from 'react';


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
                <input id="note" style={{border: '1px solid black'}} />
            </div>
            <div style={{display: 'block'}}>
                <button onClick={props.saveNote} style={{backgroundColor: 'blue', borderRadius: '5px', padding: '5px', color: 'white'}}>Save</button>
            </div>
        </>
    )
}
