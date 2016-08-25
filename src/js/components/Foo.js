import React, {Component} from 'react';

export default class Foo extends Component {

	constructor() {
		super();
		this.state = {
			text: ''
		}
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		const text = e.target.value;
		this.setState({text});
	}

	render() {
		const {text} = this.state;
		return(
			<div>
				<h1>{this.state.text}</h1>
				<input 
					type="text" 
					value={text} 
					onChange={this.onChange}/>
			</div>
		);
	}
}