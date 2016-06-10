import React, {Component} from 'react';
import {render} from 'react-dom';

class App extends Component {
	render() {
		return(
			<p>This is a test React component!</p>
		);
	}
}

render(<App/>, document.getElementById('app'));