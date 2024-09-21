from dataclasses import asdict, dataclass
from pathlib import Path


@dataclass
class Note:
    id: str
    title: str
    body: str


def create_note(title: str, body: str):
    notes_dir = Path(".") / "notes" / "Inbox"
    notes_dir.mkdir(parents=True, exist_ok=True)
    latest_id = -1
    for note_file in notes_dir.iterdir():
        note_file_id = int(note_file.name.split("_")[0])
        if note_file_id > latest_id:
            latest_id = note_file_id
    latest_id += 1
    note_file = notes_dir / f"{latest_id}_{title}.md"
    with open(note_file, 'w') as file_handle:
        file_handle.write(body + "\n")


def get_notes():
    notes_dir = Path(".") / "notes" / "Inbox"
    notes = []
    for note_file in notes_dir.iterdir():
        id = note_file.name.split("_")[0]
        title = note_file.name.replace(".md", "").replace(f"{id}_", "")
        with open(note_file) as note_file_handle:
            body = note_file_handle.read()
        notes.append(Note(id=id, title=title, body=body))
    return notes


def delete_note(id: str):
    notes_dir = Path(".") / "notes" / "Inbox"
    notes_dir.mkdir(parents=True, exist_ok=True)
    for note_file in notes_dir.iterdir():
        note_file_id = int(note_file.name.split("_")[0])
        if note_file_id == id:
            note_file.unlink()

def save(body: dict):
    if "note" in body:
        if "title" not in body:
            title = "fake-title"
        else:
            title = body["title"]
        note = body["note"]
        create_note(title, note)
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


def index(body: dict):
    notes = get_notes()
    note_bodies = [asdict(note) for note in notes]
    return {
        "notes": note_bodies,
    }
