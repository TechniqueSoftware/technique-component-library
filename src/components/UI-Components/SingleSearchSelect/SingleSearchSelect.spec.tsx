import * as React from 'react';
import { shallow } from 'enzyme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import SingleSearchSelect, { SingleSearchSelectProps } from './SingleSearchSelect';
import clubOsTheme from '../../themes/clubOS';

describe('SingleSearchSelect', () => {
  test('should render with minimal props', () => {
    const singleSearchSelectProps: SingleSearchSelectProps = {
      id: 'single-select',
      open: true,
      label: 'test label',
      value: '1',
      options: [
        { label: 'test 1', value: '1' },
        { label: 'test 2', value: '2' },
        { label: 'test 3', value: '3' }
      ],
      disabled: false,
      maxWidth: 300,
      searchContainerMaxWidth: 300,
      listContainerHeight: 600,
      onChange: jest.fn(),
      onMenuOpen: jest.fn(),
      onMenuClose: jest.fn()
    };

    const shallowTimeWrapper = shallow(
      <MuiThemeProvider theme={clubOsTheme}>
        <SingleSearchSelect {...singleSearchSelectProps} />
      </MuiThemeProvider>
      );
    expect(shallowTimeWrapper.debug()).toMatchSnapshot();
  });
});
