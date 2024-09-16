from dataclasses import asdict, dataclass
import sqlite3

from .db import create_tables




def create_note(body: str):
    create_tables()
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO notes (body) VALUES (?)", (body,))
    conn.commit()
    conn.close()

def get_notes():
    create_tables()
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM notes")
    all_notes = cursor.fetchall()
    conn.close()
    return all_notes

def delete_note(id: int):
    create_tables()
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM notes WHERE id = ?", (id,))
    conn.commit()
    conn.close()

def save(body: dict):
    if "note" in body:
        note = body["note"]
        create_note(note)
        return {
            "message": "saved to db",
        }
    else:
        return {
            "message": "no note provided"
        }

def delete(body: dict):
    if "id" in body:
        delete_note(body['id'])
        return {
            "message": "deleted"
        }
    else:
        return {
            "message": "no id provided"
        }


@dataclass
class Note:
    id: int
    body: str
    created: str
    updated: str

def index(body: dict):
    notes = get_notes()
    note_bodies = [asdict(Note(*note_args)) for note_args in notes]
    print("bodies:",note_bodies)
    return {
        "notes": note_bodies,
    }
