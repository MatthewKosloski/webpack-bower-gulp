import React from 'react';
import expect from 'expect.js';
import {shallow, mount, render} from 'enzyme';
import Foo from '../../src/js/components/Foo';

describe('<Foo />', () => {

	let wrapper;

	beforeEach(() => {
		wrapper = shallow(
			<Foo />
		)
	});

	it('Should have 2 (two) children', () => {
		expect(wrapper.children()).to.have.length(2);
	});
});