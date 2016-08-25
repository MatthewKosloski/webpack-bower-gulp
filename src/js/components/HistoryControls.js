import React, {Component} from 'react';
import IconButton from './IconButton';

class HistoryControls extends Component {
	render() {
		const {undo, redo} = this.props;
		return(
			<div className="text-editor__controls control-history">
				<IconButton
					icon="fa-reply"
					mouseDown={undo}
					title="Undo"
				/>
				<IconButton
					icon="fa-share"
					mouseDown={redo}
					title="Redo"
				/>
			</div>
		);
	}
}

export default HistoryControls;