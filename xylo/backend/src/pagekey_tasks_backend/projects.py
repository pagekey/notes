from dataclasses import asdict, dataclass
import sqlite3

from .db import create_tables


@dataclass
class Project:
    id: int
    title: str
    created: str
    updated: str


def create_project(title: str):
    create_tables()
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO projects (title) VALUES (?)", (title,))
    conn.commit()
    conn.close()


def get_projects():
    create_tables()
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM projects")
    all_projects = cursor.fetchall()
    conn.close()
    return all_projects


def create(body: dict):
    if "title" in body:
        title = body["title"]
        create_project(title)
        return {
            "message": "saved to db",
        }
    else:
        return {
            "message": "no title provided"
        }

def index(body: dict):
    projects = get_projects()
    project_dicts = [asdict(Project(*project_args)) for project_args in projects]
    return {
        "projects": project_dicts,
    }
