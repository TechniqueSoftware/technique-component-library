import Autocomplete, { AutocompleteProps } from './Autocomplete';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('Autocomplete', () => {

  test('should render with base props', () => {
    const baseProps: AutocompleteProps<any> = {
      getOptionLabel: (option) => option.label,
      open: false,
      inputValue: '',
      loading: false,
      inputWidth: 300,
      onOpen: jest.fn(),
      onClose: jest.fn(),
      options: [],
      id: 'asynchronous-demo',
    };
    const shallowWrapper = shallow(<Autocomplete {...baseProps} />);
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
