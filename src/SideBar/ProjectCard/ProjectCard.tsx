import './ProjectCard.less'

export type ProjectCardProps = {
    textContent: string;
    onClick: () => void;
    iconName: string;
}


export function ProjectCard({textContent, onClick, iconName}: ProjectCardProps){
    return <div class="ProjectCard">
        <p>{textContent}</p>
        <button onClick={onClick}>{iconName}</button>
    </div>
}