import { ButtonWithIcon, ButtonWithIconProps } from './ButtonWithIcon';
import * as React from 'react';
import { shallow } from 'enzyme';
import LocationOn from '@material-ui/icons/LocationOn';

describe('ButtonWithIcon', () => {

  const baseProps: ButtonWithIconProps = {};

  test('should render with minimal props', () => {
    const shallowWrapper = shallow(<ButtonWithIcon {...baseProps}  >Submit</ButtonWithIcon>);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should render icon when icon is provided, defaulting to the left position', () => {
    const props: ButtonWithIconProps = {
      ...baseProps,
      iconProps: {
        component: LocationOn
      }
    };
    const shallowWrapper = shallow(<ButtonWithIcon {...props} >Submit</ButtonWithIcon>);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should render icon when icon is provided, and should render to the right when specified', () => {
    const props: ButtonWithIconProps = {
      ...baseProps,
      iconPosition: 'right',
      iconProps: {
        component: LocationOn
      }
    };
    const shallowWrapper = shallow(<ButtonWithIcon {...props} >Submit</ButtonWithIcon>);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should map size for button to the icon size', () => {
    const component = LocationOn;
    const props: ButtonWithIconProps = {
      ...baseProps,
      size: 'medium',
      iconPosition: 'right',
      iconProps: {
        component
      }
    };
    const shallowWrapper = shallow(<ButtonWithIcon {...props} >Submit</ButtonWithIcon>);
    expect(shallowWrapper.find(component).props().fontSize).toBe('medium');
  });
});
