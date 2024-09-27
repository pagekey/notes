

from pathlib import Path


def get_workspace() -> str:
    workspace = "./notes"
    if Path("workspace.txt").exists():
        with open("workspace.txt") as f:
            workspace = f.read()
    return workspace

def set_workspace(workspace: str) -> None:
    with open("workspace.txt", "w") as f:
        f.write(workspace)

def get(body: dict):
    return {
        "workspace": get_workspace(),
    }

def set(body: dict):
    if "workspace" in body:
        workspace = body["workspace"]
        set_workspace(workspace)
        return {
            "message": "set workspace",
        }
    else:
        return {
            "message": "workspace not found in request",
        }
