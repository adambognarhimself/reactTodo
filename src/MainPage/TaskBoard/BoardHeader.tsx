import './BoardHeader.less'

export type BoardHeaderProps = {
    title: string;
    onClick: () => void;
    iconName: string;
}


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