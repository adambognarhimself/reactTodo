import './BoardHeader.less'

export type BoardHeaderProps = {
    title: string;
    onClick: () => void;
    iconName: string;
}

// The BoardHeader component is responsible for rendering a header for a board.
export function BoardHeader({title, onClick, iconName}: BoardHeaderProps){
    return <div class="BoardHeader">
                <p>{title}</p>
                <button onClick={onClick}>
                <span class="material-symbols-outlined">
                        add
                    </span>
                </button>
    </div>
}