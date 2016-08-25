import React, {Component} from 'react';
import {Entity} from 'draft-js';
import ImageWrapper from './ImageWrapper';
import AtomicImage from './AtomicImage';

class Atomic extends Component {

	constructor() {
		super();
		this.renderComponent = this.renderComponent.bind(this);
		this.onAlign = this.onAlign.bind(this);
	}

	onAlign(alignment) {
		const {block, blockProps} = this.props;
        const {editable} = blockProps;
        if (editable) {
            const entityKey = block.getEntityAt(0);
            Entity.mergeData(entityKey, {alignment});
        }
    }

	renderComponent(Component, entityData) {
		const {editable} = this.props.blockProps;
	    return editable ? (
	        <ImageWrapper 
	        	onAlign={this.onAlign} 
	        	alignment={entityData.alignment}> 
	        		{Component}
	        </ImageWrapper>
	        ) : Component;
	}

    render() {
    	const {block, blockProps} = this.props;
    	const {editable} = blockProps;
    	const entity = Entity.get(block.getEntityAt(0));
    	const type = entity.getType();

		switch(type) {
			case 'image': {
				const {src, caption, alignment} = entity.getData();
				return this.renderComponent(
					<AtomicImage 
						src={src} 
						caption={caption}
						alignment={alignment}
						editable={editable}/>,
					entity.getData()
				);
			}
			default:
				return '';
		}
    }
}

export default Atomic;