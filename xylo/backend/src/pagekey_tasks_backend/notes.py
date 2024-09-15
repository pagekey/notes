from dataclasses import asdict, dataclass
import json
import sqlite3


def create_table_if_not_exists():
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        body TEXT NOT NULL,
        created DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated DATETIME DEFAUlt CURRENT_TIMESTAMP
    )
    ''')
    conn.commit()
    conn.close()

def create_note(body: str):
    create_table_if_not_exists()
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO notes (body) VALUES (?)", (body,))
    conn.commit()
    conn.close()

def get_notes():
    create_table_if_not_exists()
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM notes")
    all_notes = cursor.fetchall()
    return all_notes

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
