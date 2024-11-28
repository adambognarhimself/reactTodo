
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
    const [triggerRefresh, setTriggerRefresh] = useState(false);

     // Trigger a refresh
     const refreshAllBoards = () => {
        setTriggerRefresh(!triggerRefresh); // Toggle to force all boards to refresh
    };

    return <div class="Screen">
        <SideBar setSelectedProject={setSelectedProject} />

        {selectedProject !== null ? (

            <div className={"MainPage"}>
                 <BoardMain
                        projectId={selectedProject}
                        state={State.TODO}
                        triggerRefresh={triggerRefresh}
                        onItemMoved={refreshAllBoards} // Pass the refresh function
                    />
                    <BoardMain
                        projectId={selectedProject}
                        state={State.IN_PROGRESS}
                        triggerRefresh={triggerRefresh}
                        onItemMoved={refreshAllBoards}
                    />
                    <BoardMain
                        projectId={selectedProject}
                        state={State.DONE}
                        triggerRefresh={triggerRefresh}
                        onItemMoved={refreshAllBoards}
                    />
            </div>

        ) : (
            <div >
                <WelcomePage />
            </div>
        )}
    </div>

}
