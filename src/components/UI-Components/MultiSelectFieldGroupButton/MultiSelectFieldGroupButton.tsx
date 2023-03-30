import * as React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import ButtonWithIcon from '../Buttons/ButtonWithIcon/ButtonWithIcon';
import MultiSelectFieldGroup, { MultiSelectFieldGroupProps } from '../MultiSelectFieldGroup/MultiSelectFieldGroup';
// noinspection TypeScriptPreferShortImport
import { MultiSelectGroupValueWrapper } from '../../..';
import { getButtonLabel } from './multiSelectFieldGroupButtonHelper';
import { SelectCustom, SelectCustomProps } from '../Select/SelectCustom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { createStyles } from '@material-ui/core';

const useMultiSelectFieldGroupButtonStyles = makeStyles(() =>
  createStyles({
    searchContainer: (props: MultiSelectFieldGroupButtonProps) => {
      return ({ width: props.searchContainerMaxWidth || 400 });
    }
  }));

export interface MultiSelectFieldGroupButtonProps {
  label: string;
  id: string;
  MultiSelectFieldGroupProps: MultiSelectFieldGroupProps;
  allLabel: string;
  disabled: boolean;
  selectMaxWidth?: number;
  searchContainerMaxWidth?: number;
  applyButton?: boolean;
  clearButton?: boolean;
}

function shouldDisableClear(pendingGroupValues: MultiSelectGroupValueWrapper[]) {
  let disableClear = true;
  pendingGroupValues.forEach((group) => {
    if (group.values.size) {
      return disableClear = false;
    }
  });
  return disableClear;
}

export function cloneGroupValueWrapperList(groupValueWrapperList: MultiSelectGroupValueWrapper[]) {
  return groupValueWrapperList.map((group) => {
    return {
      ...group,
      values: new Set(group.values.values())
    };
  });
}

export function cloneAndClearGroupValueWrapperList(groupValueWrapperList: MultiSelectGroupValueWrapper[]) {
  return groupValueWrapperList.map((group) => ({
    ...group,
    values: new Set<string>()
  }));
}

export default function MultiSelectFieldGroupButton(props: MultiSelectFieldGroupButtonProps) {
  const {
    MultiSelectFieldGroupProps: {
      onCheckboxGroupChange,
      groupValueWrapperList,
      multiSelectOptionGroupDataList,
    },
    selectMaxWidth = 300,
    id,
    label,
    disabled,
    allLabel = 'All',
    applyButton = true,
    clearButton = true,
  } = props;

/**
 * 'Pending' is used as a descriptor on pendingGroupValueWrapperList to clarify that the values contained therein belong to
 * this component's state, and have not yet been passed to the parent component. When handleApply is called, the parent
 * component (MultiSelectFieldGroup) will receive those values via handleInternalCheckboxGroupChange, and the filter will
 * implement those values. handleClear will clear all values currently in the parent component.
 */
  const [pendingGroupValueWrapperList, setPendingGroupValueWrapperList] =
    React.useState<MultiSelectGroupValueWrapper[]>(cloneGroupValueWrapperList(groupValueWrapperList));
  const [selectLabel, setButtonLabel] = React.useState<string>('');
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const groupsSelectedLabel = getButtonLabel({
      allLabel,
      multiSelectOptionGroupDataList,
      multiSelectGroupValueWrapperList: pendingGroupValueWrapperList,
    });
    setButtonLabel(groupsSelectedLabel);
  }, [pendingGroupValueWrapperList, allLabel, disabled]);

  React.useEffect(() => {
    // If disabled we're going to assume that we should reset our internal values;
    if (disabled) {
      setPendingGroupValueWrapperList(cloneAndClearGroupValueWrapperList(pendingGroupValueWrapperList));
    }
  }, [disabled]);

  // In some cases we may start with an empty array for the groupValueWrapper list. We need to watch for the list to change and update
  // if it does.
  React.useEffect(() => {
    setPendingGroupValueWrapperList(cloneGroupValueWrapperList(groupValueWrapperList));
  }, [groupValueWrapperList]);

  function handleClear() {
    // Creating a clone of the group values so we don't pass a reference to the groups.
    const newWrapperList: MultiSelectGroupValueWrapper[] = cloneAndClearGroupValueWrapperList(groupValueWrapperList);
    onCheckboxGroupChange(newWrapperList);
    setPendingGroupValueWrapperList(newWrapperList);
  }

  function handleApply() {
    const clonedGroupValues = cloneGroupValueWrapperList(pendingGroupValueWrapperList);
    onCheckboxGroupChange(clonedGroupValues);
    if (applyButton) {
      setMenuOpen(false);
    }
  }

  function handleInternalCheckboxGroupChange(pendingGroupValues: MultiSelectGroupValueWrapper[]) {
    setPendingGroupValueWrapperList(pendingGroupValues);
    if (!applyButton) {
      onCheckboxGroupChange(pendingGroupValues);
    }
  }

  function handleOpenMenu() {
    if (!disabled) {
      setMenuOpen(true);
    }
  }

  function handleCancel() {
    setMenuOpen(false);
    const clonedGroupValues = groupValueWrapperList.map((group) => ({
      ...group,
      values: new Set(group.values)
    }));
    setPendingGroupValueWrapperList(clonedGroupValues);
  }

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

  const { searchContainer } = useMultiSelectFieldGroupButtonStyles(props);

  const innerMultiSelectFieldGroupProps: MultiSelectFieldGroupProps = {
    ...props.MultiSelectFieldGroupProps,
    classes: {
      ...props.MultiSelectFieldGroupProps.classes,
      searchContainer
    },
    groupValueWrapperList: pendingGroupValueWrapperList,
    onCheckboxGroupChange: handleInternalCheckboxGroupChange,
    showMultiSelectSearchList: true,
    showHelperText: false
  };

  const disableClear: boolean = shouldDisableClear(pendingGroupValueWrapperList);

  return (
    <SelectCustom {...selectCustomProps} >
      <MultiSelectFieldGroup {...innerMultiSelectFieldGroupProps} />
      { clearButton || applyButton ?
      <DialogActions>
        { clearButton ?
        <ButtonWithIcon
          id={`${id}-clear-button`}
          onClick={handleClear}
          variant="text"
          disabled={disableClear}>
          Clear
        </ButtonWithIcon>
        :''
        }
        { applyButton ?
        <ButtonWithIcon
          id={`${id}-apply-button`}
          onClick={handleApply}
          color={'primary'}
        >
          Apply
        </ButtonWithIcon>
        :''
        }
      </DialogActions>
      :''
      }
    </SelectCustom>);
}
