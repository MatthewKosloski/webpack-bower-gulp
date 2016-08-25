import React, {Component} from 'react';
import {stateToHTML} from 'draft-js-export-html';
import TypographyControls from './TypographyControls';
import InlineStyleControls from './InlineStyleControls';
import BlockStyleControls from './BlockStyleControls';
import LinkControls from './LinkControls';
import HistoryControls from './HistoryControls';
import Atomic from './Atomic';
import Link from './Link';
import customInlineStyles from '../constants/CustomInlineStyles';

import {
	Editor, 
	EditorState, 
	RichUtils, 
	CompositeDecorator,
	AtomicBlockUtils,
	Entity
} from 'draft-js';

function findLinkEntities(contentBlock, cb) {
	contentBlock.findEntityRanges(
		(character) => {
			const entityKey = character.getEntity();
			return (
				entityKey !== null &&
				Entity.get(entityKey).getType() === 'LINK'
			);
		},
		cb
	);
}

class TextEditor extends React.Component {

	constructor(props) {
		super(props);
		const linkDecorator = new CompositeDecorator([
            {
              strategy: findLinkEntities,
              component: Link,
            },
          ]);
		this.state = {
			editorState: EditorState.createEmpty(linkDecorator),
			showLinkInput: false,
            linkValue: '',
			showImgSrcInput: false,
			imgSrcValue: '',
			showHTML: false
		};
		this.focus = this.focus.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleKeyCommand = this.handleKeyCommand.bind(this);
		this.toggleBlockType = this.toggleBlockType.bind(this);
		this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
		this.promptForLink = this.promptForLink.bind(this);
		this.confirmLink = this.confirmLink.bind(this);
		this.removeLink = this.removeLink.bind(this);
        this.onLinkInputKeyDown = this.onLinkInputKeyDown.bind(this);
        this.onLinkInputChange = this.onLinkInputChange.bind(this);
        this.toggleTypography = this.toggleTypography.bind(this);
        this.undo = this.undo.bind(this);
        this.redo = this.redo.bind(this);
        this.onImgSrcInputChange = this.onImgSrcInputChange.bind(this);
		this.addImage = this.addImage.bind(this);
		this.confirmImage = this.confirmImage.bind(this);
		this.toggleHTML = this.toggleHTML.bind(this);
	}

	focus() {
		this.refs.editor.focus();
	}

	onChange(editorState) {
		this.setState({editorState});
	}

	handleKeyCommand(command) {
		const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
		if (newState) {
			this.onChange(newState);
			return true;
		}
		return false;
	}

	toggleTypography(typeOrStyle) {
		if(typeOrStyle !== 'CODE') {
			this.toggleBlockType(typeOrStyle);
		} else {
			this.toggleInlineStyle(typeOrStyle);
		}
	}

	toggleBlockType(blockType) {
		this.onChange(
		RichUtils.toggleBlockType(
				this.state.editorState,
				blockType
			)
		);
	}

	toggleInlineStyle(inlineStyle) {
		this.onChange(
			RichUtils.toggleInlineStyle(
				this.state.editorState,
				inlineStyle
			)
		);
	}

	blockStyleFn(block) {
		switch (block.getType()) {
			case 'blockquote': return 'text-editor__blockquote';
			default: return null;
		}
	}

	promptForLink(e) {
		e.preventDefault();
		const {editorState} = this.state;
		const selection = editorState.getSelection();
		if (!selection.isCollapsed()) {
			this.setState({
				showLinkInput: true,
				linkValue: '',
			}, () => {
				setTimeout(() => this.refs.linkInput.focus(), 0);
			});
		}
	}

	confirmLink(e) {
		e.preventDefault();
		const {editorState, linkValue} = this.state;
		const entityKey = Entity.create('LINK', 'MUTABLE', {url: linkValue});
		this.setState({
			editorState: RichUtils.toggleLink(
				editorState,
				editorState.getSelection(),
				entityKey
			),
			showLinkInput: false,
			linkValue: '',
		}, () => {
			setTimeout(() => this.refs.editor.focus(), 0);
		});
	}

	onLinkInputKeyDown(e) {
		if (e.which === 13) {
			this.confirmLink(e);
		}
    }

	removeLink(e) {
		e.preventDefault();
		const {editorState} = this.state;
		const selection = editorState.getSelection();
		if (!selection.isCollapsed()) {
			this.setState({
				editorState: RichUtils.toggleLink(editorState, selection, null),
			});
		}
	}

    onLinkInputChange(e) {
		this.setState({linkValue: e.target.value});
	}

	undo() {
		const {editorState} = this.state;
		this.onChange(EditorState.undo(editorState));
	}

	redo() {
		const {editorState} = this.state;
		this.onChange(EditorState.redo(editorState));	
	}

	blockRenderer(block) {
		if (block.getType() === 'atomic') {
			return {
				component: Atomic,
				editable: false,
				props: {
					editable: true
				}
			};
		}
		return null;
	}

	onImgSrcInputChange(e) {
		this.setState({imgSrcValue: e.target.value});
	}

	confirmImage(e) {
		e.preventDefault();
		const {editorState, imgSrcValue} = this.state;
		const entityKey = Entity.create('image', 'IMMUTABLE', {
			src: imgSrcValue,
			caption: 'Lorem Ipsum dolor sit amet.',
			alignment: 'center'
		});

		this.setState({
			editorState: AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' '),
			showImgSrcInput: false,
			imgSrcValue: '',
		}, () => {
			setTimeout(() => this.focus(), 0);
		});
	}

	addImage() {
		const {editorState} = this.state;
		this.setState({
			showImgSrcInput: true,
			imgSrcValue: '',
		});
	}

	toggleHTML(e) {
		e.preventDefault();
		const {showHTML} = this.state;
		let predicate = showHTML ? false : true;
		this.setState({showHTML: predicate});
	}

	render() {
		const {
			editorState, 
			showLinkInput, 
			linkValue,
			showImgSrcInput,
			imgSrcValue,
			showHTML
		} = this.state;

		let linkInput, imgSrcInput;
		if (showLinkInput) {
			linkInput =
				<div>
					<input
						onChange={this.onLinkInputChange}
						value={linkValue}
						onKeyDown={this.onLinkInputKeyDown}
						ref="linkInput"
						type="text"
					/>
					<button onMouseDown={this.confirmLink}>Confirm</button>
				</div>;
		}
		if(showImgSrcInput) {
			imgSrcInput = 
				<div>
					<input
						onChange={this.onImgSrcInputChange}
						ref="imgInput"
						type="text"
						value={imgSrcValue}
					/>
					<button onMouseDown={this.confirmImage}>Confirm</button>
				</div>;
		}

		const htmlOutput = stateToHTML(editorState.getCurrentContent());

		const htmlOutputStyle = {
			display: showHTML ? 'block' : 'none'
		}

		return (
			<div>
				<div className="text-editor">
					<div className="text-editor__toolbar">
						<div className="text-editor__row">
							<TypographyControls 
								editorState={editorState}
				                onToggle={this.toggleTypography}
							/>
							<InlineStyleControls
				                editorState={editorState}
				                onToggle={this.toggleInlineStyle}
				            />
							<BlockStyleControls
				                editorState={editorState}
				                onToggle={this.toggleBlockType}
				                addImage={this.addImage}
				            />
				            <LinkControls 
				            	promptForLink={this.promptForLink}
				            	removeLink={this.removeLink}
				            />
				            <HistoryControls 
				            	undo={this.undo}
				            	redo={this.redo}
				            />
						</div>
						<div className="text-editor__row">
							{linkInput}
							{imgSrcInput}
						</div>
		            </div>
					<div className="text-editor__editor" onClick={this.focus}>
						<Editor 
							editorState={editorState} 
							handleKeyCommand={this.handleKeyCommand}
							blockStyleFn={this.blockStyleFn}
							onChange={this.onChange} 
							customStyleMap={customInlineStyles}
							blockRendererFn={this.blockRenderer}
							ref="editor"
						/>
					</div>
				</div>
				<div className="html-output">
					<a href="#" onClick={this.toggleHTML}>{showHTML ? 'Hide' : 'Show'} HTML</a>
					<textarea value={htmlOutput} style={htmlOutputStyle} disabled></textarea>
				</div>
			</div>
		);
	}
}


export default TextEditor;