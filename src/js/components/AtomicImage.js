import React, {Component} from 'react';
import {Resizable} from 'react-resizable';

class AtomicImage extends Component {

	constructor() {
		super();
		this.state = {
			hasLoaded: false,
			showDimensions: false,
			width: null,
			height: null
		};
		this.handleResize = this.handleResize.bind(this);
		this.handleImageLoad = this.handleImageLoad.bind(this);
		this.handleResizeStart = this.handleResizeStart.bind(this);
		this.handleResizeStop = this.handleResizeStop.bind(this);
	}

	handleResize(event, {element, size}) {
		this.setState({
			width: size.width, 
			height: size.height
		});
	};

	handleImageLoad() {
		const {img} = this.refs;
		this.setState({
			hasLoaded: true,
			width: img.clientWidth, 
			height: img.clientHeight
		});
	}

	handleResizeStart() {
		this.setState({showDimensions: true});
	}

	handleResizeStop() {
		this.setState({showDimensions: false});
	}

	render() {

		const {
			src, 
			caption, 
			alignment, 
			editable
		} = this.props;

		const {
			width, 
			height, 
			hasLoaded, 
			showDimensions
		} = this.state;

		let imgStyle = {
			width, 
			height,
		};

		if(!editable) {
			if(alignment === 'left') {
				imgStyle.float = 'left';
			} else if(alignment === 'right') {
				imgStyle.float = 'right';
			}
		}

		const dimensionStyle = {
			position: 'absolute',
			top: '50%',
			left: '50%',
			backgroundColor: 'rgba(0, 0, 0, 0.7)',
    		padding: '7px 10px',
    		fontSize: '13px',
    		fontFamily: 'sans-serif',
			color: '#fff',
			transform: 'translate(-50%, -50%)',
			borderRadius: '4px'
		}

		return(
			<div>
				{editable ? <div style={{display: 'inline-block'}}>
							<Resizable 
								width={width}
								height={height} 
								onResize={this.handleResize}
								onResizeStart={this.handleResizeStart}
								onResizeStop={this.handleResizeStop} 
								lockAspectRatio={true}>
					            <div style={imgStyle}>
					              <img 
					                ref="img" 
					                src={src} 
					                style={imgStyle} 
					                alt={caption}
					                onLoad={this.handleImageLoad}
					              />
					              {hasLoaded && showDimensions ? 
					                <span style={dimensionStyle}>{width.toFixed()} x {height.toFixed()}</span> 
					              : false}
					            </div>
					        </Resizable>
						</div>
			: <img 
				src={src} 
				alt={caption} 
				style={imgStyle} />
			}
			</div>
		);
	}
}

export default AtomicImage;