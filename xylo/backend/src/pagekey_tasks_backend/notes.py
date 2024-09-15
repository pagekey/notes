def save(body: dict):
    print("hey just got hte body:",body)
    if "note" in body:
        note = body["note"]
        with open("notes.txt", "a") as f:
            f.write(f"the note: {note}\n")
    return {
        "message": "saved",
    }
