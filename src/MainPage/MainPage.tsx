import { useState } from "preact/hooks";
import { WelcomePage } from "./WelcomePage/WelcomePage";

export function MainPage(){

    const [selected, setSelected] = useState(false);
    


    return <div className={"MainPage"}>
        <WelcomePage/>
        
    </div>
}