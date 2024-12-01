import { Priority } from "../../todos";
import './ItemText.less'


export type Props = {
    title: string;
    deadline?: Date;
    prio?: Priority;
}

// The ItemText component is responsible for rendering the text of a todo item.
export function ItemText({ title, deadline, prio }: Props) {

    return <div className="ItemText">
        <p>{title}</p>
        {deadline && <p>{`Deadline: ${new Date(deadline).toISOString().slice(0, 10)}`}</p>}
        {prio && <p>{`Priority: ${prio}`}</p>}
    </div>
}