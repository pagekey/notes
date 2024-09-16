import sqlite3


DB_PATH = "tasks.db"

def create_tables():
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
