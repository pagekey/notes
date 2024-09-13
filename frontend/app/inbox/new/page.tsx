'use client'
import { Button, TextInput } from "@mantine/core";


export default function InboxPage() {
    const saveNote = () => {
        fetch("http://localhost:5000/notes_new").then(resp => resp.text()).then(resp => {
            window.location.href = "/inbox";
        });
    }
    return (
        <>
            <h1>New Note</h1>
            <TextInput />
            <Button onClick={saveNote}>Save</Button>
        </>
    )
}
