import { render } from 'preact';
import { Screen } from './Screen/Screen';
import './index.less'


function App() {
	return <Screen/>;
}


render(<App />, document.getElementById('app'));
