import { useState } from "preact/hooks";
import "./SideNavBar.less";
import "../../googleIcon.less"

export type SideNavBarProps = {
    textContent: string;
    onClick: () => void;
    iconName: string;
    newName: string; // Input value
    setNewName: (value: string) => void; // Input change handler
};

export function SideNavBar({
    textContent,
    onClick,
    iconName,
    newName,
    setNewName,
}: SideNavBarProps) {
    const [showInputRow, setShowInputRow] = useState(false);

    const handleAddProject = () => {
        onClick(); // Trigger the `addProject` function in `SideBar`
        setShowInputRow(!showInputRow); // Hide the second row
    };

    return (
        <div className="SideNavBar">
            {/* First row */}
            <div className="row">
                <p>{textContent}</p>
                <button onClick={() => setShowInputRow(!showInputRow)}>
                    <span class="material-symbols-outlined">
                        {iconName}
                    </span>
                </button>
            </div>

            {/* Second row: Conditionally rendered */}
            {showInputRow && (
                <div className="row">
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName((e.target as HTMLInputElement).value)}
                        placeholder="Enter project name"
                    />
                    <button onClick={handleAddProject}>
                    <span class="material-symbols-outlined">
                        check
                    </span>
                    </button>
                </div>
            )}
        </div>
    );
}
