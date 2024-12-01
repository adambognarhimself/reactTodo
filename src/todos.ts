export type ProjectDto = {
    id: number;
    title: string;
    items: DataDto[];
}

export type DataDto = {
    title: string;
    state: State
    deadline?: Date;
    priority?: Priority;
}

export enum State {
    TODO = "TODO",
    IN_PROGRESS = "IN PROGRESS",
    DONE = "DONE",
}

export enum Priority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW",
}

class TODO {
    projects?: ProjectDto[];
    // Constructor: Initializes the TODO class by loading saved projects from localStorage if they exist.

    constructor() {
        const savedProjects = localStorage["projects"];
        this.projects = savedProjects ? JSON.parse(savedProjects) : [];
    }

    // Function to save the current list of projects to localStorage.

    saveProjects() {
        localStorage.setItem("projects", JSON.stringify(this.projects));
    }
    // Function to add a new project with a given title.

    addProject(title: string) {
        const newProject: ProjectDto = {
            id: this.projects.length ? this.projects[this.projects.length - 1].id + 1 : 1,
            title,
            items: [],
        };
        this.projects.push(newProject);
        this.saveProjects();
    }
    // Function to delete a project by its ID.

    deleteProject(projectId: number) {
        this.projects = this.projects.filter((project) => project.id !== projectId);
        this.saveProjects();
    }
    // Function to add a new item to a project by its ID. The item is an object without a deadline, and it accepts an optional deadline string.

    addItemToProject(projectId: number, item: Omit<DataDto, "deadline"> & { deadline?: string }) {
        const project = this.projects.find((project) => project.id === projectId);
        if (!project) throw new Error(`Project with ID ${projectId} not found`);
        project.items.push({
            ...item,
            deadline: item.deadline ? new Date(item.deadline) : undefined,
        });
        this.saveProjects();
    }
    // Function to update the state of an item in a project.

    updateItemState(projectId: number, itemTitle: string, newState: State) {
        const project = this.projects.find((project) => project.id === projectId);
        if (!project) throw new Error(`Project with ID ${projectId} not found`);
        const item = project.items.find((item) => item.title === itemTitle);
        if (!item) throw new Error(`Item with title ${itemTitle} not found`);
        item.state = newState;
        this.saveProjects();
    }
    // Function to update the title of an item in a project.

    updateItemTitle(projectId: number, itemTitle: string, newTitle: string) {
        const project = this.projects.find((project) => project.id === projectId);
        if (!project) throw new Error(`Project with ID ${projectId} not found`);
        const item = project.items.find((item) => item.title === itemTitle);
        if (!item) throw new Error(`Item with title ${itemTitle} not found`);
        item.title = newTitle;
        this.saveProjects();
    }
    // Function to update the deadline of an item in a project.

    updateItemDate(projectId: number, itemTitle: string, date: Date) {
        const project = this.projects.find((project) => project.id === projectId);
        if (!project) throw new Error(`Project with ID ${projectId} not found`);
        const item = project.items.find((item) => item.title === itemTitle);
        if (!item) throw new Error(`Item with title ${itemTitle} not found`);
        item.deadline = date;
        this.saveProjects();
    }
    // Function to update the priority of an item in a project.

    updateItemPrio(projectId: number, itemTitle: string, prio: Priority) {
        const project = this.projects.find((project) => project.id === projectId);
        if (!project) throw new Error(`Project with ID ${projectId} not found`);
        const item = project.items.find((item) => item.title === itemTitle);
        if (!item) throw new Error(`Item with title ${itemTitle} not found`);
        item.priority = prio;
        this.saveProjects();
    }
    // Function to remove an item from a project by its title.

    removeItemFromProject(projectId: number, itemTitle: string) {
        const project = this.projects.find((project) => project.id === projectId);
        if (!project) throw new Error(`Project with ID ${projectId} not found`);
        project.items = project.items.filter((item) => item.title !== itemTitle);
        this.saveProjects();
    }
    // Function to get all items from all projects filtered by a given priority.

    getItemsByPriority(prio: Priority): DataDto[] {
        return this.projects.flatMap(x => x.items).filter(x => x.priority === prio);
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


