import * as React from 'react';
import Search from '@material-ui/icons/Search';
import { Theme } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles from '@material-ui/styles/withStyles';
import MultiSelectCheckboxListItem, {
  MultiSelectCheckboxListItemClickEventData,
  MultiSelectCheckboxListItemProps
} from '../MultiSelectCheckboxListItem/MultiSelectCheckboxListItem';
import TextInput, { TextInputProps } from '../../TextInput/TextInput';

const debounce = require('lodash.debounce');

const styles = (theme: Theme) => ({
  container: {
    border: `1px solid ${theme.palette.grey['300']}`,
    background: theme.palette.common.white
  },
  whiteBackground: {
    background: theme.palette.common.white
  }
});

export type MultiSelectGroupValueWrapper = { groupId: string, values: Set<string> };

export interface MultiSelectSearchListProps {
  readOnly?: boolean;
  error?: boolean;
  classes?: any;
  multiSelectOptionGroupDataList: MultiSelectOptionGroupData[];
  groupValueWrapperList: MultiSelectGroupValueWrapper[];
  onCheckboxGroupChange: (groupValues: MultiSelectGroupValueWrapper[]) => void;
  listContainerHeight?: number;
}

export interface MultiSelectOptionGroupData {
  groupId: string;
  groupLabel: string;
  multiSelectOptionDataList: MultiSelectOptionData[];
}

export interface MultiSelectOptionData {
  name: string;
  labelString: string;
  labelComponent?: React.ReactElement<any>;
  value: string;
  disabled?: boolean;
}

export interface MultiSelectSearchListState {
  search: string;
  debouncedSearch: string;
  debounceSearchRegExp: RegExp;
  lastCheckboxChangeTimestamp: number;
}

export class MultiSelectSearchList extends React.Component<MultiSelectSearchListProps, MultiSelectSearchListState> {

  static defaultProps: Partial<MultiSelectSearchListProps> = {
    listContainerHeight: 450,
    readOnly: false
  };

  constructor(props: any) {
    super(props);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.handleCheckboxGroupChange = this.handleCheckboxGroupChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.updateLastCheckboxChangeTimestamp = this.updateLastCheckboxChangeTimestamp.bind(this);
    this.updateDebouncedSearch = debounce(this.updateDebouncedSearch, 0);

    this.state = {
      search: '',
      debouncedSearch: '',
      debounceSearchRegExp: new RegExp('', 'i'),
      lastCheckboxChangeTimestamp: new Date().getTime()
    }
    ;
  }

  shouldComponentUpdate(nextProps: MultiSelectSearchListProps, nextState: MultiSelectSearchListState) {
    // Update if the search has changed
    return (
      // If error is changed
      this.props.error !== nextProps.error ||
      // Or if the search has changed
      this.state.debouncedSearch !== nextState.debouncedSearch ||
      // Or if a checkbox change was made
      this.state.lastCheckboxChangeTimestamp !== nextState.lastCheckboxChangeTimestamp ||
      // Or if any of the groups sizes changed
      this.props.groupValueWrapperList.some((group) => {
        const nextGroup = nextProps.groupValueWrapperList.find((nextGroup) => {
          return nextGroup.groupId === group.groupId;
        });
        return nextGroup.values.size !== group.values.size;
      }) ||
      // Or if any of the group option sizes change
      this.props.multiSelectOptionGroupDataList.some((group) => {
        const nextGroup = nextProps.multiSelectOptionGroupDataList.find((nextGroup) => {
          return nextGroup.groupId === group.groupId;
        });
        return nextGroup.multiSelectOptionDataList.length !== group.multiSelectOptionDataList.length;
      })
    );
  }

  updateDebouncedSearch(search: string) {
    this.setState({
      debouncedSearch: search,
      debounceSearchRegExp: new RegExp(search, 'i')
    });
  }

  handleSearchChange(event: any) {
    const search = event.target.value;
    this.setState({ search });
    this.updateDebouncedSearch(search);
  }

  handleCheckboxGroupChange(eventData: MultiSelectCheckboxListItemClickEventData) {
    const { groupValueWrapperList, onCheckboxGroupChange, multiSelectOptionGroupDataList, } = this.props;
    const isGroupMatchingEvent = (group: Partial<{ groupId: string }>) => group.groupId === eventData.groupId;
    const optionGroupData = multiSelectOptionGroupDataList.find(isGroupMatchingEvent);
    const groupValueWrapperListCopy = groupValueWrapperList.map((item) => ({ ...item }));
    const groupValues = groupValueWrapperListCopy.find(isGroupMatchingEvent);
    if (!optionGroupData || !groupValues) {
      return false;
    }
    if (eventData.checked) {
      const allOptions: Set<any> = new Set();
      optionGroupData.multiSelectOptionDataList.forEach((item) => {
        if (!item.disabled) {
          allOptions.add(item.value);
        }
      });
      groupValues.values = allOptions;
    } else {
      groupValues.values.clear();
    }
    onCheckboxGroupChange(groupValueWrapperListCopy);
    this.updateLastCheckboxChangeTimestamp();
  }

  searchIncludes(string: string) {
    if (this.state.debouncedSearch) {
      return this.state.debounceSearchRegExp.test(string);
    }
    // If there is no search query then everything matches
    return true;
  }

  handleCheckboxClick(eventData: MultiSelectCheckboxListItemClickEventData) {
    const { groupValueWrapperList, onCheckboxGroupChange } = this.props;

    const groupValuesCopy: MultiSelectGroupValueWrapper[] = groupValueWrapperList.map((item) => ({ ...item }));
    const group = groupValuesCopy.find((group) => group.groupId === eventData.groupId);
    if (group) {
      if (eventData.checked) {
        group.values.add(eventData.value);
      } else {
        group.values.delete(eventData.value);
      }
    }
    onCheckboxGroupChange(groupValuesCopy);
    this.updateLastCheckboxChangeTimestamp();
  }

  /**
   * We update the timestamp of the last change so we can easily do a compare in shouldComponentUpdate to know when
   * our list has had a change. If we didn't do this we'd have to compare the entire groupValueWrapperList list.
   */
  updateLastCheckboxChangeTimestamp() {
    this.setState({ lastCheckboxChangeTimestamp: new Date().getTime() });
  }

  renderCheckboxListItemWithHeader(multiSelectOptionGroupData: MultiSelectOptionGroupData) {
    const { groupLabel, multiSelectOptionDataList, groupId } = multiSelectOptionGroupData;
    const { groupValueWrapperList, readOnly } = this.props;
    const { debouncedSearch } = this.state;

    const group = groupValueWrapperList.find((group) => group.groupId === groupId) || { groupId, values: new Set() };
    const allSelected = multiSelectOptionDataList.every((optionData) => optionData.disabled || group.values.has(optionData.value));
    const someSelected = multiSelectOptionDataList.some((optionData) => group.values.has(optionData.value));
    const searchMatchesSome = multiSelectOptionGroupData.multiSelectOptionDataList.some((optionData) => {
      return this.searchIncludes(optionData.labelString);
    });

    const headerProps: MultiSelectCheckboxListItemProps = {
      groupId,
      disabled: readOnly,
      labelString: groupLabel,
      checked: allSelected,
      name: `${groupId}-allSelected`,
      value: groupId,
      onClick: this.handleCheckboxGroupChange,
      indeterminate: someSelected && !allSelected
    };

    if (!searchMatchesSome) return null;
    return (
      <React.Fragment key={`checkboxList-${groupLabel}`}>
        <MultiSelectCheckboxListItem {...headerProps} />
        <ul>
          {multiSelectOptionDataList.map(multiSelectOptionData => {
            const { name, labelString, value, labelComponent, disabled } = multiSelectOptionData;
            const multiSelectCheckboxListItemProps: MultiSelectCheckboxListItemProps = {
              groupId,
              labelString,
              labelComponent,
              value,
              name,
              disabled: readOnly || disabled,
              checked: group.values.has(value),
              onClick: this.handleCheckboxClick
            };
            if (debouncedSearch && !this.searchIncludes(labelString)) return null;
            return (<MultiSelectCheckboxListItem {...multiSelectCheckboxListItemProps} key={`${groupId}-${value}`} />);
          })}
        </ul>
      </React.Fragment>);
  }

  renderSearchInput() {
    const { error = false } = this.props;
    const { search } = this.state;
    const label = 'Search';
    const props: TextInputProps = {
      error,
      value: search,
      'aria-label': label,
      placeholder: label,
      startAdornmentIcon: <Search />,
      onChange: this.handleSearchChange,
    };
    return (<TextInput {...props} />);
  }

  renderListItems() {
    return this.props.multiSelectOptionGroupDataList.map(
      (multiSelectOptionGroupData) => {
        return this.renderCheckboxListItemWithHeader(multiSelectOptionGroupData);
      });
  }

  render() {
    const { search } = this.state;
    const { multiSelectOptionGroupDataList, classes, listContainerHeight } = this.props;

    let searchMatchesSome;
    if (search) {
      searchMatchesSome = multiSelectOptionGroupDataList.some((optionGroupData) => {
        return optionGroupData.multiSelectOptionDataList.some((optionData) => {
          return this.searchIncludes(optionData.labelString);
        });
      });
    }

    const listStyles = { overflow: 'auto', maxHeight: listContainerHeight, width: '100%' };

    return (
      <div className={classes.container}>
        {this.renderSearchInput()}
        <List subheader={<li />} style={listStyles} dense>
          {(!search || search && searchMatchesSome) && this.renderListItems()}
          {search && !searchMatchesSome && <ListItem><ListItemText>No match found</ListItemText></ListItem>}
        </List>
      </div>);
  }
}

export default withStyles(styles)(MultiSelectSearchList);
