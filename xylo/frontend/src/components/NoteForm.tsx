import React from 'react';


export default function() {
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
