import * as React from 'react';
import { Theme } from '@material-ui/core';
import withStyles from '@material-ui/styles/withStyles';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from '@material-ui/core/ListItem';

import { Checkbox, CheckboxProps } from '../../Checkbox/Checkbox';
import { MultiSelectStandardOptions } from '../MultiSelectStandardSearchList/MultiSelectStandardSearchList';

const styles = (theme: Theme) => ({
  checkbox: {
    padding: theme.spacing(.5)
  }
});

export interface MultiSelectCheckboxListItemProps {
  classes?: any;
  name: string;
  labelString: string;
  value: string;
  onClick: (eventData: MultiSelectStandardOptions[]) => void;
  checked: boolean;
  disabled?: boolean;
  multiSelectStandardFieldProps: MultiSelectStandardOptions[];
}

export class MultiSelectCheckboxListItem extends React.Component<MultiSelectCheckboxListItemProps> {
  static defaultProps: Partial<MultiSelectCheckboxListItemProps> = {
    disabled: false
  };

  constructor(props: any) {
    super(props);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }

  handleCheckboxClick(event: any) {
    const { multiSelectStandardFieldProps } = this.props;
    const newArr = multiSelectStandardFieldProps.map(obj => {
      if (obj.value === event.target.value) {
        return {
          ...obj, checked: event.target.checked
        };
      }
      return obj;
    });
    this.props.onClick(newArr);
  }

  render() {
    const { name, value, labelString, checked, disabled, classes } = this.props;

    const checkboxProps: CheckboxProps = {
      className: classes.checkbox,
      color: 'primary',
      onClick: this.handleCheckboxClick
    };

    return (
      <ListItem key={`${name}-${labelString}`} dense={true}>
        <FormControlLabel
          name={name}
          disabled={disabled}
          label={labelString}
          value={value}
          checked={checked}
          control={<Checkbox {...checkboxProps} />}
        />
      </ListItem>
    );
  }
}

export default withStyles(styles)(MultiSelectCheckboxListItem);
