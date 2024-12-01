import { Priority } from "../../todos";
import { FilterBoard } from "./FilterBoard";

export function FilterPage(){
    return <div className={"MainPage"}>
        <FilterBoard prio={Priority.LOW}/>
        <FilterBoard prio={Priority.MEDIUM}/>
        <FilterBoard prio={Priority.HIGH}/>
    </div>
}