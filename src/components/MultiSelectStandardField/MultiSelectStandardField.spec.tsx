import * as React from 'react';
import { shallow } from 'enzyme';
import MultiSelectStandardField, {
  MultiSelectStandardFieldGroupProps
} from './MultiSelectStandardField';
import clubOsTheme from '../../themes/clubOS';
import { MuiThemeProvider } from '@material-ui/core/styles';

describe('MultiSelectFieldGroup', () => {
  const baseProps: MultiSelectStandardFieldGroupProps = {
    onCheckboxGroupChange: jest.fn(),
    showFieldSetLabelText: false,
    fieldSetLabelText: 'mockFieldsetLabelText',
    label: 'mockLabel',
    disabled: false,
    selectMaxWidth: 400,
    listContainerHeight: 300,
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
    ]
  };

  test('should render with minimal baseProps', () => {
    const shallowWrapper = shallow(
        <MuiThemeProvider theme={clubOsTheme}>
          <MultiSelectStandardField { ...baseProps } />);
        </MuiThemeProvider>
    );
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });
});
