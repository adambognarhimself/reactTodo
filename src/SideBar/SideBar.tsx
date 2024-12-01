import React, { useRef, useState } from "react";
import { ProjectCard } from "./ProjectCard/ProjectCard";
import { SideNavBar } from "./SideNavBar/SideNavBar";
import "./SideBar.less";
import { todo } from "../todos";
import { Footer } from "./SideNavBar/SideFooter/Footer";

export type SideBarProps = {
    setSelectedProject: (id: number) => void;
    onFilterClick: () => void;
    onStatsClick: () => void;
};

export function SideBar({ setSelectedProject, onFilterClick, onStatsClick }: SideBarProps) {
    const [projects, setProjects] = useState(todo.getProjects());
    const [newName, setNewName] = useState("");
    const inputRef = useRef<HTMLInputElement>(null); 
// Function to refresh the list of projects by fetching the latest data

    const refreshProjects = () => {
        setProjects(todo.getProjects());
    };
// Function to add a new project if the input is valid (not empty)

    const addProject = () => {
        if (newName.trim() === "") return;
        todo.addProject(newName);
        setNewName("");
        refreshProjects();
        focusInput();
    };
// Function to focus the input field to allow the user to continue typing

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus(); 
        }
    };
// Function to delete a project by its ID

    const deleteProject = (id: number) => {
        todo.deleteProject(id);
        refreshProjects();
    };

    return (
        <div className="SideBar">
            <SideNavBar
                textContent="Your projects"
                onClick={addProject}
                iconName="add"
                newName={newName}
                setNewName={setNewName}
                inputRef={inputRef} 
            />

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
