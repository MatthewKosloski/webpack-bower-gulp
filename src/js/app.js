import React, {Component} from 'react';
import {render} from 'react-dom';
import TextEditor from './components/TextEditor';

const app = (
	<TextEditor />
);

render(app, document.getElementById('app'));