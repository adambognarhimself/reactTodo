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


export function Screen() {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [triggerRefresh, setTriggerRefresh] = useState(false);
    const [currentPage, setCurrentPage] = useState<'main' | 'filter' | 'stats'>('main'); 

    // Trigger a refresh
    const refreshAllBoards = () => {
        setTriggerRefresh(!triggerRefresh); 
    };

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

            {currentPage === 'filter' && 
                <FilterPage />
            }
            {currentPage === 'stats' && <StatsPage />}

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
