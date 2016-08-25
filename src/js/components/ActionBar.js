import React from 'react';

function ActionBar({onClickLeft, onClickCenter, onClickRight}) {
	return (
		<div className="image-action-items">
			<div className="image-action-items__top">
				<button onClick={onClickLeft} title="Align the image to the left">Left</button>
				<button onClick={onClickCenter} title="Center the image">Center</button>
				<button onClick={onClickRight} title="Align the image to the right">Right</button>
			</div>
		</div>
	);
}

export default ActionBar;