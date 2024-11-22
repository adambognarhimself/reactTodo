
import { MainPage } from '../MainPage/MainPage'
import { SideBar } from '../SideBar/SideBar'
import './Screen.less'


export function Screen() {
    return <div class="Screen">
        <SideBar/>
        <MainPage/>
    </div>

}
