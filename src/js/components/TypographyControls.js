import React, {Component} from 'react';
import TYPOGRAPHY_TYPES from '../constants/TypographyTypes';

class TypographyControls extends Component {

	constructor() {
		super();
		this.onToggle = this.onToggle.bind(this);
		this.state = {
			activeItem: 'Paragraph'
		}
	}

	onToggle(e) {
		const {onToggle} = this.props;
		const val = e.target.value;
 		e.preventDefault();
		onToggle(val);
		this.setState({activeItem: this.getLabel(val)});
	}

	getLabel(style) {
		return TYPOGRAPHY_TYPES[TYPOGRAPHY_TYPES.findIndex((e) => e.style === style)].label;
	}

	render() {
		const {editorState, onToggle} = this.props;
		const selection = editorState.getSelection();
		const blockType = editorState
			.getCurrentContent()
			.getBlockForKey(selection.getStartKey())
			.getType();

		return(
			<div className="text-editor__controls control--dropdown">
				<select className="text-editor__dropdown" onChange={this.onToggle}>
					{TYPOGRAPHY_TYPES.map((type) =>
						<option 
							key={type.label} 
							value={type.style}>
						{type.label}
						</option>
					)}
				</select>
				<span>{this.state.activeItem}</span>
			</div>
		);
	}
}

export default TypographyControls;