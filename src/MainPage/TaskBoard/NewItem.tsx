import './NewItem.less'

export type NewItemProps = {
    value: string;
    onChange: (e) => void;
    onKeyDown: (event) => void;
    addTask: () => void;
    cancelNewTask: () => void;
}
// The NewItem component is responsible for rendering an input field for adding a new task.
export function NewItem({ value, onChange, onKeyDown, addTask, cancelNewTask }: NewItemProps) {

    return <div className="NewTaskRow">
        <div className="input">
            <input
                type="text"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder="Enter title..."
                autoFocus
            />
        </div>
        <div className="buttons">
            <button onClick={addTask}>Add</button>
            <button onClick={cancelNewTask}>Cancel</button>
        </div>

    </div>

}