import { render } from 'preact';
import { Screen } from './Screen/Screen';
import './index.less'
import { todo } from './todos';


function App() {

	


	console.log("Project after moving item:", todo.getProjectById(1));
	return <Screen/>;
}



render(<App />, document.getElementById('app'));
