import sqlite3


DB_PATH = "tasks.db"

PROJECT_CREATE_TABLE = """
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated DATETIME DEFAUlt CURRENT_TIMESTAMP
)
"""

NOTE_CREATE_TABLE = """
CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    body TEXT NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated DATETIME DEFAUlt CURRENT_TIMESTAMP
)
"""

ACTION_CREATE_TABLE = """
CREATE TABLE IF NOT EXISTS actions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated DATETIME DEFAUlt CURRENT_TIMESTAMP
)
"""


def create_tables():
    conn = sqlite3.connect("tasks.db")
    cursor = conn.cursor()
    cursor.execute(NOTE_CREATE_TABLE)
    cursor.execute(ACTION_CREATE_TABLE)
    cursor.execute(PROJECT_CREATE_TABLE)
    conn.commit()
    conn.close()
