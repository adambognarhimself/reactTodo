import { useState } from 'preact/hooks';
import { Priority, todo } from '../../todos'
import './FilterBoard.less'
import { Items } from './FilterBoardItem';

export type Props ={
    prio: Priority;

}

export function FilterBoard({prio}: Props){
    const [project, setProject] = useState(todo.getItemsByPriority(prio));

    return <div class={"Board"}>
        
        <div className="Header">
            {prio}
        </div>

        <div className="Items">
            {project.map((x) => (
                <Items
                    title={x.title}
                />
            ))}
        </div>

    </div>
}