import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
// @ts-ignore
import ItemForm from './ItemForm.tsx';
import { checkProps, findByTestAttr } from '../../../test/testUtils';


const defaultProps = {onSubmit:() => {}, onCancel:() => {}, initialItem:{}};

const setup = (props={}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<ItemForm {...setupProps} />);
}

test('renders the expected non-empty component without error', () => {
    const wrapper = setup({onSubmit:() => {}, onCancel:() => {}, initialItem:{}});
    console.log(wrapper.debug());
    expect(wrapper.exists()).toBe(true);
    const itemFormComponent = findByTestAttr(wrapper,"component-itemform"); 
    expect(itemFormComponent.length).toBe(1);
});

test('does not throw warning with expected props',() =>{
    const expectedProps = {onSubmit:() => {}, onCancel: () => {}, initialItem:{}};
    const propError = checkProps(ItemForm, expectedProps);
    expect(propError).toBeUndefined();
});

test('sets name text field default value from props initialItem',() => {
    const wrapper = setup({onSubmit:() => {}, onCancel: () => {}, initialItem:{name:'foo',description:'bar'}});
    const nameTextField = findByTestAttr(wrapper,"component-itemform-name"); 
    expect(nameTextField.props().defaultValue).toBe('foo');
});

test('sets description text field default value form from props initialItem',() => {
    const wrapper = setup({onSubmit:() => {}, onCancel: () => {}, initialItem:{name:'foo',description:'bar'}});
    const descriptionTextField = findByTestAttr(wrapper,"component-itemform-description"); 
    expect(descriptionTextField.props().defaultValue).toBe('bar');
});