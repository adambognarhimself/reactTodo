import { useState } from 'preact/hooks';
import { MainPage } from '../MainPage/MainPage';
import { SideBar } from '../SideBar/SideBar';
import './Screen.less';
import { BoardMain } from '../MainPage/TaskBoard/BoardMain';
import { WelcomePage } from '../MainPage/WelcomePage/WelcomePage';
import '../MainPage/MainPage.less';
import { State } from '../todos';
import { FilterPage } from '../MainPage/FilterPage/FilterPage';
import { StatsPage } from '../MainPage/StatsPage/StatsPage';

// The Screen component is responsible for rendering the main screen of the application.
export function Screen() {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [triggerRefresh, setTriggerRefresh] = useState(false);
    const [currentPage, setCurrentPage] = useState<'main' | 'filter' | 'stats'>('main'); 

    // Trigger a refresh
    const refreshAllBoards = () => {
        setTriggerRefresh(!triggerRefresh); 
    };
// The handleSelectProject function is responsible for setting the selected project and changing the current page to 'main'.
    const handleSelectProject = (projectId: number) => {
        setSelectedProject(projectId);
        setCurrentPage('main'); 
    };

    return (
        <div class="Screen">
            <SideBar
                setSelectedProject={handleSelectProject}
                onFilterClick={() => setCurrentPage('filter')} 
                onStatsClick={() => setCurrentPage('stats')} 
            />
{/*Switch pages based on the selected one*/}
            {currentPage === 'filter' && 
                <FilterPage />
            }
            {currentPage === 'stats' && <StatsPage />}
{/* The MainPage component is responsible for rendering the main page of the application. */}
            {currentPage === 'main' && (
                selectedProject !== null ? (
                    <div className={"MainPage"}>
                        <BoardMain
                            projectId={selectedProject}
                            state={State.TODO}
                            triggerRefresh={triggerRefresh}
                            onItemMoved={refreshAllBoards} 
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
                    <WelcomePage />
                )
            )}
        </div>
    );
}
