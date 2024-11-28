import './BoardItem.less';

export type EditTitleProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    editTask: () => void;
    cancelNewTask: () => void;
};

export function EditTitle({ value, onChange, onKeyDown, editTask, cancelNewTask }: EditTitleProps) {
    return (
        <div className="EditTitleRow">
            <input
                type="text"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder="Enter title..."
                autoFocus
            />
            
                <button class={"left"} onClick={editTask}>Save</button>
                <button onClick={cancelNewTask}>Cancel</button>
            
        </div>
    );
}
