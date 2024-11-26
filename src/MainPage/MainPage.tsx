import { useState } from "preact/hooks";
import { WelcomePage } from "./WelcomePage/WelcomePage";
import { BoardMain } from "./TaskBoard/BoardMain";
import './MainPage.less'

export function MainPage(){

    const [selected, setSelected] = useState(false);
    


    return <div className={"MainPage"}>
        
        {/* <WelcomePage/> */}

        <BoardMain title = "TODO"/>
        <BoardMain title = "IN PROGRESS"/>
        <BoardMain title = "DONE"/>

        
    </div>
}