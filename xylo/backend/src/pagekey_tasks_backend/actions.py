from pathlib import Path
from typing import List

from pagekey_tasks_backend.workspace import get_workspace


def create_action(title: str):
    actions_file = Path(get_workspace()) / "Actions.md"
    actions_file.parent.mkdir(parents=True, exist_ok=True)
    if not actions_file.exists():
        actions_file.touch()
    title_clean = title.replace("\n", "")
    with open(actions_file, "a") as file_handle:
        file_handle.write(f"- {title_clean}\n")


def get_actions() -> List[str]:
    actions_file = Path(get_workspace()) / "Actions.md"
    if actions_file.exists():
        actions = []
        with open(actions_file, "r") as file_handle:
            for line in file_handle:
                if line.startswith("- "):
                    actions.append(line.replace("- ", "").strip())
        return actions
    else:
        return []


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


def index(body: dict):
    actions = get_actions()
    return {
        "actions": actions,
    }
