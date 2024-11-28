import { useEffect, useState } from 'preact/hooks';
import { BoardHeader } from './BoardHeader';
import { BoardItem } from './BoardItem';
import './BoardMain.less';
import { State, todo } from '../../todos';
import { WelcomePage } from '../WelcomePage/WelcomePage';
import { NewItem } from './NewItem';


export type BoardMainProps = {
    projectId: number;
    state: State;
    triggerRefresh: boolean;
    onItemMoved: () => void;
}

export function BoardMain({ projectId, state, triggerRefresh, onItemMoved, }: BoardMainProps) {
    const [project, setProject] = useState(todo.getProjectById(projectId));
    const [newTaskTitle, setNewTaskTitle] = useState(null);
    const [editTaskTitle, setEditTaskTitle] = useState(null);

    // Fetch project data when projectId changes or triggerRefresh updates
    useEffect(() => {
        refreshProject();
    }, [projectId, triggerRefresh]); // Listen for both projectId and triggerRefresh changes

    const refreshProject = () => {
        setProject(todo.getProjectById(projectId));
    };

    const addTask = () => {
        if (newTaskTitle && newTaskTitle.trim()) {
            todo.addItemToProject(projectId, { title: newTaskTitle.trim(), state });
            setNewTaskTitle(null); // Clear the input row
            onItemMoved(); // Trigger a global refresh
        }
    };

    const cancelNewTask = () => {
        setNewTaskTitle(null); // Cancel the new task input
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            addTask(); // Add task on Enter
        } else if (event.key === 'Escape') {
            cancelNewTask(); // Cancel input on Escape
        }
    };

    // Update task state
    const updateTaskState = (taskTitle: string, newState: State) => {
        todo.updateItemState(projectId, taskTitle, newState);
        onItemMoved();
    };

    const updateTasktitle =(title: string, newTitle: string)=>{
        todo.updateItemTitle(projectId, title,newTitle);
        onItemMoved();
    }

    // Delete a task
    const deleteTask = (taskTitle: string) => {
        todo.removeItemFromProject(projectId, taskTitle);
        onItemMoved();
    };

    if (!project) return <WelcomePage />;

    return (
        <div className="BoardMain">
            <div className="Header">
                <BoardHeader title={state} onClick={() => setNewTaskTitle("")} iconName="add" />
            </div>

            <div className="Items">

                {newTaskTitle !== null && (
                    <NewItem
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle((e.target as HTMLInputElement).value)}
                        onKeyDown={handleKeyDown}
                        addTask={addTask}
                        cancelNewTask={cancelNewTask}
                    />
                )}


                {/* Filter tasks based on the provided state */}
                {project.items
                    .filter((item) => item.state === state) // Filter tasks by state
                    .map((item) => (
                        <BoardItem
                            key={item.title}
                            title={item.title}
                            onDelete={() => deleteTask(item.title)} // Example action
                            onMove={(newState) => updateTaskState(item.title, newState as State)}
                            onEditTitle={(title)=> updateTasktitle(item.title, title)}
                        />
                    ))}
            </div>
        </div>
    );
}
