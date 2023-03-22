import * as React from 'react';
import { Theme } from '@material-ui/core';
import List from '@material-ui/core/List';
import withStyles from '@material-ui/styles/withStyles';

import MultiSelectStandardCheckboxListItem, { MultiSelectCheckboxListItemProps } from '../MultiSelectStandardCheckboxListItem/MultiSelectCheckboxListItem';

const styles = (theme: Theme) => ({
  container: {
    border: `1px solid ${theme.palette.grey['300']}`,
    background: theme.palette.common.white
  },
  whiteBackground: {
    background: theme.palette.common.white
  }
});

export interface MultiSelectStandardOptions {
  name: string;
  labelString: string;
  value: string;
  checked: boolean;
}
export interface MultiSelectSearchListProps {
  classes?: any;
  listContainerHeight?: number;
  selectMaxWidth?: number;
  multiSelectStandardFieldProps?: MultiSelectStandardOptions[];
  onCheckboxGroupChange: (groupValues: MultiSelectStandardOptions[]) => void;
  disabled?: boolean;
}
export class MultiSelectStandardSearchList extends React.Component<MultiSelectSearchListProps> {

  static defaultProps: Partial<MultiSelectSearchListProps> = {
    listContainerHeight: 450,
    disabled: false
  };

  constructor(props: any) {
    super(props);
    this.handleCheckboxGroupChange = this.handleCheckboxGroupChange.bind(this);
  }

  handleCheckboxGroupChange(eventData: MultiSelectStandardOptions[]) {
    this.props.onCheckboxGroupChange(eventData);
  }

  renderCheckboxListItemWithHeader(item : any) {
    const { labelString, name, value, checked } = item;
    const { disabled, multiSelectStandardFieldProps } = this.props;

    const headerProps: MultiSelectCheckboxListItemProps = {
      labelString,
      value,
      checked,
      disabled,
      multiSelectStandardFieldProps,
      name: `${name}-allSelected`,
      onClick: this.handleCheckboxGroupChange,
    };

    return (
      <React.Fragment key={`checkboxList-${labelString}`}>
        <MultiSelectStandardCheckboxListItem {...headerProps} />
      </React.Fragment>
    );
  }

  render() {
    const { classes, listContainerHeight, selectMaxWidth, multiSelectStandardFieldProps } = this.props;
    const listStyles = { overflow: 'auto', maxHeight: listContainerHeight, width: selectMaxWidth };
    return (
      <div className={classes.container}>
        <List subheader={<li />} style={listStyles} dense>
          {multiSelectStandardFieldProps
            && multiSelectStandardFieldProps.map((item: any) => {
              return this.renderCheckboxListItemWithHeader(item);
            })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(MultiSelectStandardSearchList);
