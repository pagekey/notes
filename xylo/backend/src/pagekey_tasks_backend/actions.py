from dataclasses import dataclass
import sqlite3

from .db import create_tables


@dataclass
class Action:
    id: int
    title: str
    created: str
    updated: str

def create_action(title: str):
    create_tables()
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO actions (title) VALUES (?)", (title,))
    conn.commit()
    conn.close()


def create(body: dict):
    if "title" in body:
        title = body["title"]
        create_action(title)
        return {
            "message": "saved to db",
        }
    else:
        return {
            "message": "no title provided"
        }
