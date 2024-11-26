import { BoardHeader } from './BoardHeader';
import './BoardMain.less'

export type BoardMainProps = {
    title: string;
}



export function BoardMain({title}: BoardMainProps){

    return <div className={"BoardMain"}>

        <BoardHeader title = {title} onClick={() => {}} iconName='add' />
            p
            <br />
            p
            p
            <br />
            p
            p
            <br />
            p

            p
            <br />
            p
            
        
    </div>
}