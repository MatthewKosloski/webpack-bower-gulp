import React, {Component} from 'react';

class IconButton extends Component {
    constructor() {
        super();
        this.handleMouseDown = (e) => {
            const {style, mouseDown} = this.props;
            e.preventDefault();
            mouseDown(style);
        };
    }

    render() {
        const {
            active, 
            icon, 
            style, 
            mouseDown, 
            title
        } = this.props;

        let className = 'text-editor__button';
        if (active) className += ' active';
        let monospaceStyle = {
            fontFamily: '"Menlo", monospace',
        }
        return (
            <div 
                className={className}
                onMouseDown={style !== undefined ? this.handleMouseDown : mouseDown} 
                title={title}>
                    {icon !== undefined ? 
                        <i className={`fa ${icon}`} aria-hidden="true"></i> 
                    : <span style={monospaceStyle}>&#123;&#125;</span>}
            </div>
        );
    }
}

export default IconButton;