import React, {Component} from 'react';
import IconButton from './IconButton';
import BLOCK_TYPES from '../constants/BlockTypes';

class BlockStyleControls extends Component {

	render() {
		const {editorState, onToggle, addImage} = this.props;
		const selection = editorState.getSelection();
		const blockType = editorState
			.getCurrentContent()
			.getBlockForKey(selection.getStartKey())
			.getType();

		return (
			<div className="text-editor__controls control--block-styles">
				{BLOCK_TYPES.map((type) =>
					<IconButton
						key={type.icon}
						active={type.style === blockType}
						icon={type.icon}
						mouseDown={onToggle}
						style={type.style}
						title={type.title}
					/>
				)}
					<IconButton 
						key="fa-file-image-o"
						icon="fa-file-image-o"
						mouseDown={addImage}
						title="Insert photo"
					/>
			</div>
		);
	}
};

export default BlockStyleControls;