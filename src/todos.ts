export type ProjectDto = {
    id: number;
    title: string;
    items: DataDto[];
}

export type DataDto = {
    title: string;
    state: State
    deadline?: Date;
}

export enum State {
    TODO = "todo",
    IN_PROGRESS = "inProgress",
    DONE = "done",
}

class TODO{
    projects?: ProjectDto[];
}

const savedProjects = localStorage["projects"];
const projects = savedProjects ? JSON.parse(savedProjects): [];

function saveProjects(){
    localStorage["projects"] = JSON.stringify(projects)
}
