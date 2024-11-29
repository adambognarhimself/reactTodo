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
    TODO = "TODO",
    IN_PROGRESS = "IN PROGRESS",
    DONE = "DONE",
}

class TODO{
    projects?: ProjectDto[];

    constructor(){
        const savedProjects = localStorage["projects"];
        this.projects = savedProjects ? JSON.parse(savedProjects): [];
    }
    

    saveProjects(){
        localStorage.setItem("projects", JSON.stringify(this.projects));
    }

    addProject(title: string) {
        const newProject: ProjectDto = {
            id: this.projects.length ? this.projects[this.projects.length - 1].id + 1 : 1,
            title,
            items: [],
        };
        this.projects.push(newProject);
        this.saveProjects();
    }

    deleteProject(projectId: number) {
        this.projects = this.projects.filter((project) => project.id !== projectId);
        this.saveProjects();
    }

    addItemToProject(projectId: number, item: Omit<DataDto, "deadline"> & { deadline?: string }) {
        const project = this.projects.find((project) => project.id === projectId);
        if (!project) throw new Error(`Project with ID ${projectId} not found`);
        project.items.push({
            ...item,
            deadline: item.deadline ? new Date(item.deadline) : undefined,
        });
        this.saveProjects();
    }

    updateItemState(projectId: number, itemTitle: string, newState: State) {
        const project = this.projects.find((project) => project.id === projectId);
        if (!project) throw new Error(`Project with ID ${projectId} not found`);
        const item = project.items.find((item) => item.title === itemTitle);
        if (!item) throw new Error(`Item with title ${itemTitle} not found`);
        item.state = newState;
        this.saveProjects();
    }

    updateItemTitle(projectId: number, itemTitle: string, newTitle: string){
        const project = this.projects.find((project) => project.id === projectId);
        if (!project) throw new Error(`Project with ID ${projectId} not found`);
        const item = project.items.find((item) => item.title === itemTitle);
        if (!item) throw new Error(`Item with title ${itemTitle} not found`);
        item.title = newTitle;
        this.saveProjects();
    }

    updateItemDate(projectId: number, itemTitle: string, date: Date){
        const project = this.projects.find((project) => project.id === projectId);
        if (!project) throw new Error(`Project with ID ${projectId} not found`);
        const item = project.items.find((item) => item.title === itemTitle);
        if (!item) throw new Error(`Item with title ${itemTitle} not found`);
        item.deadline = date;
        this.saveProjects();
    }

    removeItemFromProject(projectId: number, itemTitle: string) {
        const project = this.projects.find((project) => project.id === projectId);
        if (!project) throw new Error(`Project with ID ${projectId} not found`);
        project.items = project.items.filter((item) => item.title !== itemTitle);
        this.saveProjects();
    }

    getProjects() {
        return this.projects;
    }

    // Get a single project by ID
    getProjectById(projectId: number) {
        return this.projects.find((project) => project.id === projectId);
    }

}

export const todo = new TODO();


