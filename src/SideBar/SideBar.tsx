import React, { useState } from "react";
import { ProjectCard } from "./ProjectCard/ProjectCard";
import { SideNavBar } from "./SideNavBar/SideNavBar";
import "./SideBar.less";

export function SideBar() {
    const [projects, setProjects] = useState([]); // Initial cards
    const [newName, setNewName] = useState("");

    // Add a new card
    const addProject = () => {
        if (newName.trim() === "") return; // Prevent empty names
        setProjects([...projects, newName]); // Add the new project
        setNewName(""); // Clear the input
    };

    // Delete a card
    const deleteProject = (index: number) => {
        setProjects(projects.filter((_, i) => i !== index)); // Remove the card by index
    };

    return (
        <div className="SideBar">
            {/* Sidebar Navigation */}
            <SideNavBar
                textContent="Your projects"
                onClick={addProject}
                iconName="plus"
                newName={newName}
                setNewName={setNewName} // Pass state handlers
            />

            {/* Project Cards */}
            <div className="projects">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        textContent={project}
                        onClick={() => deleteProject(index)} // Pass index to delete function
                        iconName="del"
                    />
                ))}
            </div>
        </div>
    );
}
