import { useState } from "preact/hooks";
import "./SideNavBar.less";
import "../../googleIcon.less";
import { RefObject } from "preact";

export type SideNavBarProps = {
    textContent: string;
    onClick: () => void;
    iconName: string;
    newName: string;
    setNewName: (value: string) => void;
    inputRef: RefObject<HTMLInputElement>; // Ref for the input field
};
// The SideNavBar component is responsible for rendering a side navigation bar.
export function SideNavBar({
    textContent,
    onClick,
    iconName,
    newName,
    setNewName,
    inputRef,
}: SideNavBarProps) {
    const [showInputRow, setShowInputRow] = useState(false);
// Logic for adding a project
    const handleAddProject = () => {
        onClick();
        setShowInputRow(false); // Hide the input row after adding
    };

    // Logic for focusing input
    const toggleInputRow = () => {
        setShowInputRow((prev) => !prev);
        if (!showInputRow) {
            setTimeout(() => {
                inputRef.current?.focus(); // Focus input when row is displayed
            }, 0); 
        }
    };

    return (
        <div className="SideNavBar">
            <div className="row">
                <p>{textContent}</p>
                <button onClick={toggleInputRow}>
                    <span className="material-symbols-outlined">{iconName}</span>
                </button>
            </div>

            {showInputRow && (
                <div className="row">
                    <input
                        ref={inputRef} 
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName((e.target as HTMLInputElement).value)}
                        placeholder="Enter project name"
                    />
                    <button onClick={handleAddProject}>
                        <span className="material-symbols-outlined">check</span>
                    </button>
                </div>
            )}
        </div>
    );
}
