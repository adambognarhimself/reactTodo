import React, { useState } from "react";
import { ProjectCard } from "./ProjectCard/ProjectCard";
import { SideNavBar } from "./SideNavBar/SideNavBar";
import "./SideBar.less";
import { todo } from "../todos";

export function SideBar({setSelectedProject} : {setSelectedProject: (id:number) => void}) {
    const [projects, setProjects] = useState(todo.getProjects()); // Initial cards
    const [newName, setNewName] = useState("");

    const refreshProjects = () => {
        setProjects(todo.getProjects());
    };

    // Add a new project
    const addProject = () => {
        if (newName.trim() === "") return; // Prevent empty names
        todo.addProject(newName);
        setNewName("");
        refreshProjects();
    };

    // Delete a project
    const deleteProject = (id: number) => {
        todo.deleteProject(id);
        refreshProjects();
    };

    return (
        <div className="SideBar">
            {/* Sidebar Navigation */}
            <SideNavBar
                textContent="Your projects"
                onClick={addProject}
                iconName="plus"
                newName={newName}
                setNewName={setNewName}
            />

            {/* Project Cards */}
            <div className="projects">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        textContent={project.title}
                        onClick={() => setSelectedProject(project.id)} 
                        iconName="del"
                        onDelete={() => deleteProject(project.id)}
                    />
                ))}
            </div>
        </div>
    );
}
