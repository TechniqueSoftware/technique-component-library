import * as React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import ButtonWithIcon from '../Buttons/ButtonWithIcon/ButtonWithIcon';

import { SelectCustom, SelectCustomProps } from '../Select/SelectCustom';
import MultiSelectStandardField, { MultiSelectStandardFieldGroupProps } from '../MultiSelectStandardField/MultiSelectStandardField';
import { MultiSelectStandardOptions } from '../MultiSelectStandardField/MultiSelectStandardSearchList/MultiSelectStandardSearchList';
import { getButtonLabel } from './MultiSelectStandardFieldButtonHelper';

export interface MultiSelectStandardFieldButtonProps {
  id: string;
  label: string;
  disabled?: boolean;
  selectMaxWidth?: number;
  listContainerHeight: number;
  applyButton?: boolean;
  clearButton?: boolean;
  multiSelectStandardFieldProps: MultiSelectStandardOptions[];
  onCheckboxGroupChange: (groupValues : MultiSelectStandardOptions[]) => void;
}

export default function MultiSelectStandardFieldButton(props: MultiSelectStandardFieldButtonProps) {
  const { id,
    label,
    disabled,
    listContainerHeight,
    selectMaxWidth,
    multiSelectStandardFieldProps,
    applyButton,
    clearButton,
    onCheckboxGroupChange
  } = props;

  const [standardWrapperList, setStandardWrapperList] = React.useState(multiSelectStandardFieldProps);
  const [clonnedList, setClonnedList] = React.useState([]);
  const [selectLabel, setButtonLabel] = React.useState<string>('');
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  function handleInternalCheckboxGroupChange(pendingGroupValues: MultiSelectStandardOptions[]) {
    setStandardWrapperList(pendingGroupValues);
    if (!applyButton) {
      setStandardWrapperList(pendingGroupValues);
      onCheckboxGroupChange(pendingGroupValues);
    }
  }

  React.useEffect(() => {
    if (multiSelectStandardFieldProps) setStandardWrapperList(multiSelectStandardFieldProps);
  }, []);

  // Used for to disable the clear button if list's values isn't selected
  function shouldDisableClear(pendingGroupValues: MultiSelectStandardOptions[]) {
    let disableClear = true;
    pendingGroupValues.forEach((item) => {
      if (item.checked) return disableClear = false;
    });
    return disableClear;
  }

  /**
   * It gives us the value if we check options, with that we are showing label inside the dropdown.
   * Then `pendingGroupValueWrapperList` storing the checked values of list.
   * Where we're applying conditions on that arrray of object.
   */
  React.useEffect(() => {
    const groupsSelectedLabel = getButtonLabel(standardWrapperList, label);
    setButtonLabel(groupsSelectedLabel);
  }, [menuOpen, selectLabel, standardWrapperList]);

  /**
   * Clearing the object of selected item with replacing checked value with false.
   */
  function handleClear() {
    const resetOptionWithCheckboxValueFalse = standardWrapperList.map(item => {
      return { ...item, checked: false };
    });
    setStandardWrapperList(resetOptionWithCheckboxValueFalse);
    setClonnedList(resetOptionWithCheckboxValueFalse);
    onCheckboxGroupChange(resetOptionWithCheckboxValueFalse);
    // setMenuOpen(false);
  }

  function handleApply() {
    onCheckboxGroupChange(standardWrapperList);
    if (applyButton) {
      setMenuOpen(false);
    }
  }

  function handleOpenMenu() {
    setClonnedList(standardWrapperList);
    if (!disabled) {
      setMenuOpen(true);
    }
  }

  function handleCancel() {
    setStandardWrapperList(clonnedList);
    onCheckboxGroupChange(clonnedList);
    setMenuOpen(false);
  }

  /**
   * If it's disabled then we're not even opening the dropdown. That's why we are setting it's value to empty array.
   */
  React.useEffect(() => {
    if (disabled) {
      setMenuOpen(false);
      setStandardWrapperList([]);
    }
    if (!disabled) setStandardWrapperList(multiSelectStandardFieldProps);
  }, [disabled]);

  React.useEffect(() => {
    if (!applyButton) {
      setStandardWrapperList(standardWrapperList);
      setClonnedList(standardWrapperList);
    }
  }, [applyButton, standardWrapperList]);

  const multiSelectFieldProps: MultiSelectStandardFieldGroupProps = {
    label,
    listContainerHeight,
    disabled,
    selectMaxWidth,
    onCheckboxGroupChange: handleInternalCheckboxGroupChange,
    multiSelectStandardFieldProps: standardWrapperList,
  };

  const selectCustomProps: SelectCustomProps = {
    disabled,
    label,
    maxWidth: selectMaxWidth,
    open: menuOpen,
    id: `${id}-select`,
    value: selectLabel,
    onMenuOpen: handleOpenMenu,
    onMenuClose: handleCancel
  };

  const disableClear: boolean = shouldDisableClear(standardWrapperList);

  return (
    <SelectCustom {...selectCustomProps} >
      <MultiSelectStandardField {...multiSelectFieldProps} />
      {clearButton || applyButton ?
        <DialogActions>
          {clearButton ?
            <ButtonWithIcon
              id={`${id}-clear-button`}
              onClick={handleClear}
              variant="text"
              disabled={disableClear}
            >
              Clear
            </ButtonWithIcon>
            : ''
          }
          {applyButton ?
            <ButtonWithIcon
              id={`${id}-apply-button`}
              onClick={handleApply}
              color={'primary'}
            >
              Apply
            </ButtonWithIcon>
            : ''
          }
        </DialogActions>
        : ''
      }
    </SelectCustom>
  );
}
