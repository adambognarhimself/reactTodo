import { useEffect, useMemo, useState } from 'preact/hooks';
import { BoardHeader } from './BoardHeader';
import { BoardItem } from './BoardItem';
import './BoardMain.less';
import { Priority, State, todo } from '../../todos';
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

    // Effect hook to fetch project data when projectId changes or triggerRefresh updates
    useEffect(() => {
        refreshProject();
    }, [projectId, triggerRefresh]);

    // Memoized function to filter tasks by state (TODO, IN PROGRESS, DONE)
    const filteredTasks = useMemo(() => {
        if (!project) return [];
        return project.items.filter((item) => item.state === state);
    }, [project, state]);

    // Function to refresh the project data by fetching it again using the projectId
    const refreshProject = () => {
        setProject(todo.getProjectById(projectId));
    };

    // Function to add a new task to the project if the title is valid
    const addTask = () => {
        if (newTaskTitle && newTaskTitle.trim()) {
            todo.addItemToProject(projectId, { title: newTaskTitle.trim(), state });
            setNewTaskTitle(null);
            onItemMoved();
        }
    };

    // Function to cancel the new task input and clear the state
    const cancelNewTask = () => {
        setNewTaskTitle(null);
    };
    // Function to handle keydown events in the input field (add task on Enter, cancel on Escape)

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            addTask();
        } else if (event.key === 'Escape') {
            cancelNewTask();
        }
    };

    // Function to update the state of a task (e.g., move it to TODO, IN PROGRESS, DONE)
    const updateTaskState = (taskTitle: string, newState: State) => {
        todo.updateItemState(projectId, taskTitle, newState);
        onItemMoved();
    };
    // Function to update the title of a task

    const updateTasktitle = (title: string, newTitle: string) => {
        todo.updateItemTitle(projectId, title, newTitle);
        onItemMoved();
    }
    // Function to update the deadline of a task

    const updateTaskDate = (title: string, date: Date) => {
        todo.updateItemDate(projectId, title, date);
        console.log("date saved")
        console.log("Project after moving item:", todo.getProjectById(projectId));
        onItemMoved();
    }
    // Function to update the priority of a task

    const updateTaskPrio = (title: string, prio: Priority) => {
        todo.updateItemPrio(projectId, title, prio);
        console.log("date saved")
        console.log("Project after moving item:", todo.getProjectById(projectId));
        onItemMoved();
    }

    // Function to delete a task from the project

    const deleteTask = (taskTitle: string) => {
        todo.removeItemFromProject(projectId, taskTitle);
        onItemMoved();
    };

    if (!project) return null;

    return (
        <div className="BoardMain">

            <BoardHeader title={state} onClick={() => setNewTaskTitle("")} iconName="add" />


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
                            onEditTitle={(title) => updateTasktitle(item.title, title)}
                            onSaveDate={(date) => updateTaskDate(item.title, date)}
                            deadline={item.deadline}
                            onEditPriority={(prio) => updateTaskPrio(item.title, prio)}
                            prio={item.priority}
                        />
                    ))}
            </div>
        </div>
    );
}
