import { shallow } from 'enzyme';
import * as React from 'react';
import { TextInputProps, TextInput } from './TextInput';
import Search from '@material-ui/icons/Search';

describe('TextInput', () => {

  const baseProps: TextInputProps = {
    'aria-label': 'mockAriaLabel',
    value: 'mockValue',
    classes: {
      root: 'root',
      input: 'input',
      startIcon: 'startIcon',
      inputNoLeftPad: 'inputNoLeftPad'
    },
    onChange: jest.fn(),
    placeholder: 'mockPlaceHolder',
  };

  it('should render with minimal props', () => {
    const shallowWrapper = shallow(<TextInput {...baseProps} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  it('should pass on startAdornment when provided with one', () => {
    const props: TextInputProps = {
      ...baseProps,
      startAdornmentIcon: <Search />
    };
    const shallowWrapper = shallow(<TextInput {...props} />);
    expect((shallowWrapper.find('WithStyles(ForwardRef(Input))').props() as any).startAdornment).toBeTruthy();
  });

  it('should call onChange handler when input changes', () => {
    const props: TextInputProps = {
      ...baseProps,
      startAdornmentIcon: <Search />
    };
    const shallowWrapper = shallow(<TextInput {...props} />);
    shallowWrapper.find('WithStyles(ForwardRef(FormControl))').simulate('change');
    expect((props.onChange as any).mock.calls.length).toBe(1);
  });
});
