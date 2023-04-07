import { shallow } from 'enzyme';
import * as React from 'react';
import MultiSelectStandardSearchList, { MultiSelectSearchListProps } from './MultiSelectStandardSearchList';
import { MuiThemeProvider } from '@material-ui/core/styles';
import clubOsTheme from '../../storyThemes';

describe('MultiSelectSearchList', () => {
  const baseProps: MultiSelectSearchListProps = {
    classes: {
      searchContainer: 'mockSearchContainerClass'
    },
    listContainerHeight: 400,
    selectMaxWidth: 300,
    multiSelectStandardFieldProps: [
      {
        labelString: 'First-Time Leads',
        value: 'FirstTimeLeads',
        name: 'FirstTimeLeads',
        checked: true
      },
      {
        labelString: 'Re-Interested Leads',
        value: 'ReInterestedLeads',
        name: 'ReInterestedLeads',
        checked: true
      },
      {
        labelString: 'Re-Interested Ex-Members',
        value: 'ReInterestedExMembers',
        name: 'ReInterestedExMembers',
        checked: false
      }
    ],
    onCheckboxGroupChange: jest.fn(),
    disabled: false,
  };

  test('should render with minimal props', () => {
    const props = { ...baseProps };
    const shallowWrapper = shallow(
      <MuiThemeProvider theme={clubOsTheme} >
        <MultiSelectStandardSearchList {...props} />
      </MuiThemeProvider>
    );
    const searchInputWrapper = shallowWrapper.find('WithStyles(TextInput)');
    expect(searchInputWrapper.debug()).toMatchSnapshot();
  });
});
