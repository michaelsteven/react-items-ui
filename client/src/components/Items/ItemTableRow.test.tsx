import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
import { checkProps, findByTestAttr } from '../../../test/testUtils';
// @ts-ignore
import ItemTableRow from './ItemTableRow.tsx';

const defaultProps = {handleEditClicked:() => {}, handleDeleteClicked:() => {}, item:{}};

const setup = (props={}) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<ItemTableRow {...setupProps} />);
}

beforeEach(()=>{
    jest.spyOn(React, "useEffect").mockImplementation(f => f());
});

test('renders the expected non-empty component without error', () => {
    const wrapper = setup({handleEditClicked:() => {}, handleDeleteClicked:() => {}, item:{id:0,name:'',description:'',dateSubmitted:''}});
    console.log(wrapper.debug());
    expect(wrapper.exists()).toBe(true);
    const itemFormComponent = findByTestAttr(wrapper,"component-itemtablerow"); 
    expect(itemFormComponent.length).toBe(1);
});

test('does not throw warning with expected props',() =>{
    const expectedProps = {handleEditClicked:() => {}, handleDeleteClicked:() => {}, item:{id:0,name:'',description:'',dateSubmitted:''}};
    const propError = checkProps(ItemTableRow, expectedProps);
    expect(propError).toBeUndefined();
});

test('sets id field default value from props item',() => {
    const wrapper = setup({handleEditClicked:() => {}, handleDeleteClicked:() => {}, item:{id:1,name:'',description:'',dateSubmitted:''}});
    const idCell = findByTestAttr(wrapper,"component-itemtablerow-idcell"); 
    expect(idCell.text()).toBe("0");
})

test('sets name field default value from props item',() => {
    const wrapper = setup({handleEditClicked:() => {}, handleDeleteClicked:() => {}, item:{id:0,name:'foo',description:'',dateSubmitted:''}});
    const nameCell = findByTestAttr(wrapper,"component-itemtablerow-namecell"); 
    expect(nameCell.text()).toBe('');
})