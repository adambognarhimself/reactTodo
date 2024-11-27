
import { useState } from 'preact/hooks';
import { MainPage } from '../MainPage/MainPage'
import { SideBar } from '../SideBar/SideBar'
import './Screen.less'
import { BoardMain } from '../MainPage/TaskBoard/BoardMain';
import { WelcomePage } from '../MainPage/WelcomePage/WelcomePage';
import '../MainPage/MainPage.less'
import { State } from '../todos';


export function Screen() {

    const [selectedProject, setSelectedProject] = useState<number | null>(null);

    const handleProjectSwitch = (newProjectId: number) => {
        setSelectedProject(newProjectId); // Update the selected project
    };


    return <div class="Screen">
        <SideBar setSelectedProject={setSelectedProject} />

        {selectedProject !== null ? (

            <div className={"MainPage"}>
                <BoardMain projectId={selectedProject} state={State.TODO} />
                <BoardMain projectId={selectedProject}  state={State.IN_PROGRESS}/>
                <BoardMain projectId={selectedProject} state={State.DONE}/>
            </div>

        ) : (
            <div >
                <WelcomePage />
            </div>
        )}
    </div>

}
