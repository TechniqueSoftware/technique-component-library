import { getButtonLabel } from './MultiSelectStandardFieldButtonHelper';
import { MultiSelectStandardFieldButtonProps } from './MultiSelectStandardFieldButton';

describe('multiSelectFieldGroupButtonHelper', () => {
  const baseProps: MultiSelectStandardFieldButtonProps = {
    id: 'mockid',
    label: 'Lead Type',
    disabled: false,
    selectMaxWidth: 300,
    listContainerHeight: 250,
    applyButton: true,
    clearButton: true,
    multiSelectStandardFieldProps: [
      {
        labelString: 'First-Time Leads',
        value: 'FirstTimeLeads',
        name: 'FirstTimeLeads',
        checked: false
      },
      {
        labelString: 'Re-Interested Leads',
        value: 'ReInterestedLeads',
        name: 'ReInterestedLeads',
        checked: false
      },
      {
        labelString: 'Re-Interested Ex-Members',
        value: 'ReInterestedExMembers',
        name: 'ReInterestedExMembers',
        checked: false
      }
    ],
    onCheckboxGroupChange: jest.fn()
  };

  test('should return the "Select" value when no items are selected', () => {
    const { label, multiSelectStandardFieldProps } = baseProps;

    const allLabel = 'All';
    const optionLabel = getButtonLabel(multiSelectStandardFieldProps, label);
    expect(optionLabel).toBe(allLabel);
  });

  test('should return the label of the value when only one value is selected', () => {
    const { label } = baseProps;
    const props : MultiSelectStandardFieldButtonProps = {
      ...baseProps,
      multiSelectStandardFieldProps : [
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
          checked: false
        },
        {
          labelString: 'Re-Interested Ex-Members',
          value: 'ReInterestedExMembers',
          name: 'ReInterestedExMembers',
          checked: false
        }
      ]
    };
    const optionLabel = getButtonLabel(props.multiSelectStandardFieldProps, label);
    expect(optionLabel).toBe(props.multiSelectStandardFieldProps[0].labelString);
  });

  test('should return label of dropdown when two options are checked', () => {
    const { label } = baseProps;
    const props : MultiSelectStandardFieldButtonProps = {
      ...baseProps,
      multiSelectStandardFieldProps : [
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

    const optionLabel = getButtonLabel(props.multiSelectStandardFieldProps, label);
    expect(optionLabel).toBe(`2 ${label}s`);
  });

  test('should return label of dropdown when three options are checked', () => {
    const { label } = baseProps;
    const props : MultiSelectStandardFieldButtonProps = {
      ...baseProps,
      multiSelectStandardFieldProps : [
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
          checked: true
        }
      ]
    };

    const optionLabel = getButtonLabel(props.multiSelectStandardFieldProps, label);
    expect(optionLabel).toBe(`3 ${label}s`);
  });
});
