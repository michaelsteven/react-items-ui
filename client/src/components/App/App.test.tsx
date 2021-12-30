import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../test/testUtils';
import App from './App';

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

test('renders non-empty component without error', () => {
    const wrapper = setup();
    expect(wrapper.exists()).toBe(true);
});

test('renders the expected component', () => {
    const wrapper = setup();
    console.log(wrapper.debug());
    const appComponent = findByTestAttr(wrapper,"component-app"); 
    expect(appComponent.length).toBe(1);
});