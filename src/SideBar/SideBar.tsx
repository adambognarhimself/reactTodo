import React, { useState } from "react";
import { ProjectCard } from "./ProjectCard/ProjectCard";
import { SideNavBar } from "./SideNavBar/SideNavBar";
import "./SideBar.less";
import { todo } from "../todos";
import { Footer } from "./SideNavBar/SideFooter/Footer";

export type SideBarProps = {
    setSelectedProject: (id: number) => void; // Callback to select a project
    onFilterClick: () => void;               // Callback for the Filter button
    onStatsClick: () => void;                // Callback for the Stats button
};


export function SideBar({ setSelectedProject, onFilterClick, onStatsClick }: SideBarProps) {
    const [projects, setProjects] = useState(todo.getProjects());
    const [newName, setNewName] = useState("");

    const refreshProjects = () => {
        setProjects(todo.getProjects());
    };

    const addProject = () => {
        if (newName.trim() === "") return;
        todo.addProject(newName);
        setNewName("");
        refreshProjects();
    };

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
                iconName="add"
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
                        iconName="delete"
                        onDelete={() => deleteProject(project.id)}
                    />
                ))}
            </div>

            <Footer onFilterClick={onFilterClick} onStatsClick={onStatsClick} />
        </div>
    );
}
