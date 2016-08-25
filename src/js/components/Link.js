import React from 'react';
import {Entity} from 'draft-js';

function Link({entityKey, children}) {
	const {url} = Entity.get(entityKey).getData();
	return <a href={url}>{children}</a>;
}

export default Link;