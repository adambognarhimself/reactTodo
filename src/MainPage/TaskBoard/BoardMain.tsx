import { useEffect, useState } from 'preact/hooks';
import { BoardHeader } from './BoardHeader';
import { BoardItem } from './BoardItem';
import './BoardMain.less';
import { State, todo } from '../../todos';

export function BoardMain({ projectId, state }: { projectId: number; state: State }) {
    const [project, setProject] = useState(todo.getProjectById(projectId));
    const [triggerRefresh, setTriggerRefresh] = useState(false); // Add a state variable to trigger re-renders

    // Fetch project data when projectId changes or triggerRefresh updates
    useEffect(() => {
        refreshProject();
    }, [projectId, triggerRefresh]); // Listen for both projectId and triggerRefresh changes

    const refreshProject = () => {
        setProject(todo.getProjectById(projectId));
    };

    const addTask = () => {
        const title = prompt("Enter task title:");
        if (!title) return;
        todo.addItemToProject(projectId, { title, state });
        setTriggerRefresh(!triggerRefresh); // Toggle triggerRefresh to force re-render
    };

    // Update task state
    const updateTaskState = (taskTitle: string, newState: State) => {
        todo.updateItemState(projectId, taskTitle, newState);
        setTriggerRefresh(!triggerRefresh); // Toggle triggerRefresh to force re-render
    };

    // Delete a task
    const deleteTask = (taskTitle: string) => {
        todo.removeItemFromProject(projectId, taskTitle);
        setTriggerRefresh(!triggerRefresh); // Toggle triggerRefresh to force re-render
    };

    if (!project) return <div>No project selected</div>;

    return (
        <div className="BoardMain">
            <div className="Header">
                <BoardHeader title={state} onClick={addTask} iconName="add" />
            </div>

            <div className="Items">
                {/* Filter tasks based on the provided state */}
                {project.items
                    .filter((item) => item.state === state) // Filter tasks by state
                    .map((item) => (
                        <BoardItem
                            key={item.title}
                            title={item.title}
                            onClick={() =>{}} // Example action
                            iconName={item.state === State.TODO ? "edit" : "done"}
                        />
                    ))}
            </div>
        </div>
    );
}
