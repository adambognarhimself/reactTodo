import { BoardHeader } from './BoardHeader';
import { BoardItem } from './BoardItem';
import './BoardMain.less'

export type BoardMainProps = {
    title: string;
}



export function BoardMain({title}: BoardMainProps){

    return <div className={"BoardMain"}>

        <div class={"Header"}><BoardHeader title = {title} onClick={() => {}} iconName='add' /></div>
        
        <div className="Items">
         <BoardItem title = "test" onClick={()=> {}} iconName="edit"/>
         <BoardItem title = "test" onClick={()=> {}} iconName="edit"/>
         <BoardItem title = "test" onClick={()=> {}} iconName="edit"/>
         <BoardItem title = "test" onClick={()=> {}} iconName="edit"/>
         <BoardItem title = "test" onClick={()=> {}} iconName="edit"/>

        </div>
        
        
            
        
    </div>
}