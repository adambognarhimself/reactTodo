import './ProjectCard.less'


export type ProjectCardProps = {
    textContent: string;
    onClick: () => void;
    iconName: string;
    onDelete: () => void;
}

// The ProjectCard component is responsible for rendering a single project card.
export function ProjectCard({ textContent, onClick, iconName, onDelete }: ProjectCardProps) {
    return <button class="ProjectCard" onClick={onClick}>
        <p>{textContent}</p>
        <button onClick={onDelete}>
            <span class="material-symbols-outlined">
                {iconName}
            </span>
        </button>
    </button>
}