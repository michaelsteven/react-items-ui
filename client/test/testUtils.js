import checkPropTypes from 'check-prop-types';

/**
 * creates a collection of elements that have a data-test property matching the value.
 * @function findByTestAttr
 * @param {*} wrapper 
 * @param {*} value 
 * @returns array of matching components
 */
export const findByTestAttr = (wrapper, value) => wrapper.find(`[data-test='${value}']`);

export const checkProps = (component, conformingProps) => {
    const propError =  checkPropTypes(
        component.propTypes,
        conformingProps,
        'prop',
        component.name
        );
    expect(propError).toBeUndefined();
}