import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { FieldErrorList, FieldErrorListProps } from './FieldErrorList';

describe('FieldErrorList', () => {
  let fieldErrorListProps: FieldErrorListProps;

  beforeEach(() => {
    fieldErrorListProps = {
      title: 'There was an error. Please update the following:',
      errors: {
        name: ['Name is too short'],
        promoCode: ['Code is expired']
      },
      labels: {
        name: 'Name',
        promoCode: 'Promo Code Field Name',
        description: 'Description Header',
      }
    };
  });

  test('should render with minimal props', () => {
    const props = { ...fieldErrorListProps };
    const shallowWrapper = shallow(<FieldErrorList {...props} />);

    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should render and errors should be there', () => {
    const props = { ...fieldErrorListProps };
    const reactWrapper = mount(<FieldErrorList {...props} />);

    const name = reactWrapper.findWhere((node) => node.text().indexOf('Name is too short' as string) > 0);
    expect(name.length > 0).toBeTruthy();

    const promoCode = reactWrapper.findWhere((node) => node.text().indexOf('Code is expired' as string) > 0);
    expect(promoCode.length > 0).toBeTruthy();

    expect(reactWrapper.debug()).toMatchSnapshot();
  });

  test('should render with different errors', () => {
    const props = { ...fieldErrorListProps };
    props.errors = {
      name: ['Name is too short', 'Name has invalid character'],
      description: ['Description has invalid character']
    };
    const reactWrapper = mount(<FieldErrorList {...props} />);

    const name = reactWrapper.findWhere((node) => node.text().indexOf('Name' as string) > 0);
    expect(name.length).toBe(4);

    const description = reactWrapper.findWhere((node) => node.text().indexOf('Description Header' as string) > 0);
    expect(description.length).toBe(5);

    const promoCode = reactWrapper.findWhere((node) => node.text().indexOf('Code is expired' as string) > 0);
    expect(promoCode.length).toBe(0);

    expect(reactWrapper.debug()).toMatchSnapshot();
  });
});
