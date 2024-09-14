import React from 'react';


const NoteForm = function() {
    const saveNote = () => {
        console.log("saving:", document.getElementById("note").value);
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
