import React, {Component} from 'react';
import ActionBar from './ActionBar';
import {getImageWrapperStyle} from '../helpers';

class ImageWrapper extends Component {

	constructor() {
		super();
		this.state = {showActionBar: false};
		this.showActionBar = this.showActionBar.bind(this);
		this.hideActionBar = this.hideActionBar.bind(this);
	}

	showActionBar() {
		this.setState({showActionBar: true});
    }

    hideActionBar() {
		this.setState({showActionBar: false});
    }

	render() {
		const {alignment, children, onAlign} = this.props;
		const {showActionBar} = this.state;

		let style = getImageWrapperStyle(alignment);

		return(
			<div 
				className="image-wrapper" 
				style={style} 
				onMouseOver={this.showActionBar} 
				onMouseLeave={this.hideActionBar}>
					<div className="image-wrapper__inner">
						{showActionBar ? <ActionBar 
								onClickLeft={onAlign.bind(null, 'left')}
								onClickCenter={onAlign.bind(null, 'center')}
								onClickRight={onAlign.bind(null, 'right')}>
							</ActionBar>
						: false}
						{children}
					</div>
			</div>
		);
	}
}

export default ImageWrapper;