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
    const inputRef = useRef<HTMLInputElement>(null); // Ref for the input field

    const refreshProjects = () => {
        setProjects(todo.getProjects());
    };

    const addProject = () => {
        if (newName.trim() === "") return;
        todo.addProject(newName);
        setNewName("");
        refreshProjects();
        focusInput(); // Focus the input field after adding
    };

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus(); // Set focus to the input field
        }
    };

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
                inputRef={inputRef} // Pass the ref to the child component
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
