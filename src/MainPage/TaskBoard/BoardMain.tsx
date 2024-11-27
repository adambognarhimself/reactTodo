import { useState } from 'preact/hooks';
import { BoardHeader } from './BoardHeader';
import { BoardItem } from './BoardItem';
import './BoardMain.less'
import { State, todo } from '../../todos';




export function BoardMain({ projectId, state }: { projectId: number, state: State }) {

    const [project, setProject] = useState(todo.getProjectById(projectId));
    

    const refreshProject = () => {
        setProject(todo.getProjectById(projectId));
    };

    const addTask = () => {
        const title = prompt("Enter task title:");
        if (!title) return;
        todo.addItemToProject(projectId, { title, state});
        refreshProject();
    };

    // Update task state
    const updateTaskState = (taskTitle: string, newState: State) => {
        todo.updateItemState(projectId, taskTitle, newState);
        refreshProject();
    };

    // Delete a task
    const deleteTask = (taskTitle: string) => {
        todo.removeItemFromProject(projectId, taskTitle);
        refreshProject();
    };


    if (!project) return <div>No project selected</div>;

    return <div className={"BoardMain"}>

        <div class={"Header"}><BoardHeader title={state} onClick={addTask} iconName='add' /></div>

        <div className="Items">
            {/* Filter tasks based on the provided state */}
            {project.items
                    .filter((item) => item.state === state) // Filter tasks by state
                    .map((item) => (
                        <BoardItem
                            key={item.title}
                            title={item.title}
                            onClick={() =>
                                updateTaskState(
                                    item.title,
                                    item.state === State.TODO
                                        ? State.IN_PROGRESS
                                        : State.DONE
                                )
                            }
                            iconName="edit"
                        />
                    ))}

        </div>




    </div>
}