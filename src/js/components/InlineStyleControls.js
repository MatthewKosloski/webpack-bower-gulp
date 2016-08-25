import React, {Component} from 'react';
import IconButton from './IconButton';
import INLINE_STYLES from '../constants/InlineStyles';

class InlineStyleControls extends Component {

	render() {
		const {editorState, onToggle} = this.props;
		const currentStyle = editorState.getCurrentInlineStyle();
		return (
			<div className="text-editor__controls control--inline-styles">
				{INLINE_STYLES.map((type, i) =>
					<IconButton
						key={i}
						active={currentStyle.has(type.style)}
						icon={type.icon}
						mouseDown={onToggle}
						style={type.style}
						title={type.title}
					/>
				)}
			</div>
		);
	}

};

export default InlineStyleControls;