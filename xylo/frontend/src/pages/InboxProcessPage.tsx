import React from 'react';
import { Note } from '../models/Note';
import Button from '../components/std/Button';
import TextInput from '../components/std/TextInput';
import Link from '../components/std/Link';


interface ActionFormProps {
    label: string
    initialValue: string,
    onCreate: Function,
}
const ActionForm = (props: ActionFormProps) => {
    const [name, setName] = React.useState<string>(props.initialValue);
    return (
        <>
            <div>{props.label}</div>
            <TextInput value={name} onChange={(e: any) => setName(e.target.value)} />
            <Button onClick={() => props.onCreate(name)}>Create</Button>
        </>
    )
}

export default () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string>("");
    const [notes, setNotes] = React.useState<Note[]>([]);
    const [index, setIndex] = React.useState<number>(0);

    const [actionFormShown, setActionFormShown] = React.useState<boolean>(false);
    const [projectFormShown, setProjectFormShown] = React.useState<boolean>(false);

    React.useEffect(() => {
        fetch("http://localhost:5000/notes", {
            method: "GET",
        }).then(res => res.json()).then(res => {
            setNotes(res['notes']);
            setLoading(false);
        });
    }, []);
    
    const sendTrash = (id: number) => {
        if (confirm("Delete this note permanently?")) {
            fetch("http://localhost:5000/delete_note", {
                method: "POST",
                body: JSON.stringify({
                    id
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(res => res.json()).then(res => {
                setIndex(index => index+1);
            });
        }
    };
    const handleCreateAction = () => {
        setActionFormShown(true);
        setProjectFormShown(false);
    };
    const handleCreateProject = () => {
        setActionFormShown(false);
        setProjectFormShown(true);
    }
    const sendAction = (action: string) => {
        setActionFormShown(false);
        fetch("http://localhost:5000/actions/create", {
            method: "POST",
            body: JSON.stringify({
                title: action
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(res => {
            setIndex(index => index+1);
            setActionFormShown(false);
        });
    };
    const sendProject = (project: string) => {
        setActionFormShown(false);
        fetch("http://localhost:5000/projects/create", {
            method: "POST",
            body: JSON.stringify({
                title: project
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(res => {
            setIndex(index => index+1);
            setProjectFormShown(false);
        });
    }

    return (
        <div>
            <Link href="/">Home</Link>
            <div>Process Inbox</div>
            {loading ? "Loading..." : (error ? "An error occurred." : (
                index >= notes.length ? "All done!" : (
                    <>
                        <div>Reviewing note {index+1} of {notes.length}</div>
                        <div style={{fontSize: "150%"}}><pre>{notes[index].body}</pre></div>
                        <div>
                            <Button onClick={() => sendTrash(notes[index].id)}>Trash</Button>
                            <Button onClick={handleCreateAction}>Create action</Button>
                            <Button onClick={handleCreateProject}>Create project</Button>
                        </div>
                        {actionFormShown && <ActionForm label="Creating Action" onCreate={sendAction} initialValue={notes[index].body} />}
                        {projectFormShown && <ActionForm label="Creating Project" onCreate={sendProject} initialValue={notes[index].body} />}
                    </>
            )))}
        </div>
    )
}
