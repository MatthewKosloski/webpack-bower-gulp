export function getImageWrapperStyle(alignment) {

	let float, padding;

	if(alignment === 'left') {
		float = 'left';
		padding = '20px 20px 0 0';
	} else if(alignment === 'right') {
		float = 'right';
		padding = '20px 0 0 20px';
	} else {
		float = 'none';
		padding = '20px';
	}

	return {
		margin: '0 auto',
		textAlign: 'center',
		float: float,
		padding: padding
	}
}