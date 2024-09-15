import React from 'react';


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
            <label>Note</label>
            <input id="note" />
            <button onClick={saveNote}>Save</button>
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
            <div>
                HOME! Hello Xylo. <a href="/about">About page here</a>
            </div>
            <div>Message: {message}</div>
            <NoteForm />
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
