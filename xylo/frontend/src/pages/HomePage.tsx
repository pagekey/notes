import React from 'react';
import NoteForm from '../components/NoteForm';
import InboxList from '../components/InboxList';
import { Note } from '../models/Note';
import Link from '../components/std/Link';
import { Project } from '../models/Project';


export default function() {
    const [notes, setNotes] = React.useState<Note[]>([]);
    const [actions, setActions] = React.useState<string[]>([]);
    const [projects, setProjects] = React.useState<Project[]>([]);
    React.useEffect(() => {
        fetch("http://localhost:5000/notes", {
            method: "GET",
        }).then(res => res.json()).then(res => {
            setNotes(res['notes']);
        });
        fetch("http://localhost:5000/actions", {
            method: "GET",
        }).then(res => res.json()).then(res => {
            setActions(res['actions']);
        });
        fetch("http://localhost:5000/projects", {
            method: "GET",
        }).then(res => res.json()).then(res => {
            setProjects(res['projects']);
        });
    }, []);
    const saveNote = () => {
        const titleElem = document.getElementById("note_title");
        const noteElem = document.getElementById("note");
        const noteTitle = titleElem.value;
        const noteBody = noteElem.value;
        if (noteBody.length < 1) {
            return;
        }
        fetch("http://localhost:5000/notes/create", {
            method: "POST",
            body: JSON.stringify({
                title: noteTitle,
                note: noteBody
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            titleElem.value = "";
            noteElem.value = "";
            setNotes(notes => [...notes, {id: undefined, title: noteTitle, body: noteBody, created: undefined, updated: undefined}])
        });
    };
    return (
        <div>
            <div style={{fontSize: "150%"}}>PageKey Tasks</div>
            <div style={{fontWeight: "bold"}}>Home</div>
            <div><Link href="/about">About</Link></div>
            <NoteForm saveNote={saveNote} />
            <InboxList notes={notes} />
            <div style={{fontWeight: 'bold'}}>Next Actions</div>
            <table>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Context</th>
                    </tr>
                </thead>
                <tbody>
                    {actions.map(action => {
                        return (
                            <tr>
                                <td>
                                    {action}
                                </td>
                                <td>
                                    {/*TODO*/}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div style={{fontWeight: 'bold'}}>Projects</div>
            <table>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Next Action</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => {
                        return (
                            <tr>
                                <td>
                                    {project.title}
                                </td>
                                <td>
                                    {/*TODO*/}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
};
