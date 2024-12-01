import { render } from 'preact';
import { Screen } from './Screen/Screen';
import './index.less'
import { todo } from './todos';


function App() {

	return <Screen/>;
}



render(<App />, document.getElementById('app'));
