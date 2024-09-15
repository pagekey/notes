import React from 'react';
import NoteForm from '../components/NoteForm';
import InboxList from '../components/InboxList';


export default function() {
    const [message, setMessage] = React.useState<string>("Loading...");
    React.useEffect(() => {
        fetch("http://localhost:5000/").then(resp => resp.json()).then(data => {
            setMessage(data.message);
        })
    }, []);
    return (
        <div>
            <div style={{fontSize: "150%"}}>PageKey Tasks</div>
            <div style={{fontWeight: "bold"}}>Home</div>
            <div>Here is a link to about: <a href="/about" style={{textDecoration: "underline"}}>About</a></div>
            <div>Message from server: {message}</div>
            <NoteForm />
            <InboxList />
            <div style={{fontWeight: 'bold'}}>Next Actions</div>
            <div style={{fontWeight: 'bold'}}>Projects</div>
        </div>
    )
};
