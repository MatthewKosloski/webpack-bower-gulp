import React, {Component} from 'react';
import IconButton from './IconButton';

class LinkControls extends Component {
	render() {
		const {promptForLink, removeLink} = this.props;
		return(
			<div className="text-editor__controls control-link">
				<IconButton
					icon="fa-link"
					mouseDown={promptForLink}
					title="Add Link"
				/>
				<IconButton
					icon="fa-chain-broken"
					mouseDown={removeLink}
					title="Remove Link"
				/>
			</div>
		);
	}
}

export default LinkControls;