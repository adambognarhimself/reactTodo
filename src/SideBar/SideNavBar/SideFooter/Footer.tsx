import './Footer.less'

export type Props = {
    onFilterClick: () => void;
    onStatsClick: () => void;
}

export function Footer({ onFilterClick, onStatsClick }: Props) {
    return <div className="Footer">
        <button onClick={onFilterClick}>
            <span class="material-symbols-outlined">
                filter_alt
            </span>
        </button>

        <button onClick={onStatsClick}>
            <span class="material-symbols-outlined">
                monitoring
            </span>
        </button>
    </div>
}