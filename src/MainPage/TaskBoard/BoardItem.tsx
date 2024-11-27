import './BoardItem.less'

export type BoardItemProps = {
    title: string;
    onClick: () => void;
    iconName: string;
}


export function BoardItem({title, onClick, iconName}: BoardItemProps){
    return <div class="BoardItem">
                <p>{title}</p>
                <button onClick={onClick}>
                    {iconName}
                </button>
    </div>
}