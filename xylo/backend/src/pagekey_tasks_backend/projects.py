from dataclasses import asdict, dataclass
from pathlib import Path
from typing import List


@dataclass
class Project:
    title: str


def create_project(title: str):
    projects_dir = Path(".") / "notes" / "Projects"
    project_file = projects_dir / title / f"_{title}.md"
    project_file.parent.mkdir(parents=True, exist_ok=True)
    with open(project_file, 'w') as file_handle:
        file_handle.write("Goals\n\nPOCs\n\nProjects\n")


def get_projects():
    projects_dir = Path(".") / "notes" / "Projects"
    projects = []
    for project_dir in projects_dir.iterdir():
        title = project_dir.name
        projects.append(Project(title=title))
    return projects


def create(body: dict) -> List[Project]:
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
    project_dicts = [asdict(project) for project in projects]
    return {
        "projects": project_dicts,
    }
