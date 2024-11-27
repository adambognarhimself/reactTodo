import './ProjectCard.less'

export type ProjectCardProps = {
    textContent: string;
    onClick: () => void;
    iconName: string;
    onDelete: () => void;
}


export function ProjectCard({textContent, onClick, iconName, onDelete}: ProjectCardProps){
    return <button class="ProjectCard" onClick={onClick}>
        <p>{textContent}</p>
        <button onClick={onDelete}>{iconName}</button>
    </button>
}