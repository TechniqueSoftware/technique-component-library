import * as React from 'react';
import { Theme } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import withStyles from '@material-ui/styles/withStyles';
import { Checkbox, CheckboxProps } from '../../Checkbox/Checkbox';

const styles = (theme: Theme) => ({
  checkbox: {
    padding: theme.spacing(.5)
  }
});

export interface MultiSelectCheckboxListItemProps {
  classes?: any;
  groupId: string;
  name: string;
  labelString: string;
  labelComponent?: React.ReactElement<any>;
  value: string;
  onClick: (eventData: MultiSelectCheckboxListItemClickEventData) => void;
  checked: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
}

export interface MultiSelectCheckboxListItemClickEventData {
  groupId: string;
  value: string;
  checked: boolean;
}

export class MultiSelectCheckboxListItem extends React.Component<MultiSelectCheckboxListItemProps> {

  static defaultProps: Partial<MultiSelectCheckboxListItemProps> = {
    indeterminate: false,
    disabled: false
  };

  constructor(props: any) {
    super(props);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }

  shouldComponentUpdate(nextProps: MultiSelectCheckboxListItemProps) {
    return nextProps.checked !== this.props.checked ||
      nextProps.indeterminate !== this.props.indeterminate;
  }

  handleCheckboxClick(event: any) {
    const { groupId, value } = this.props;
    const { target } = event;
    const multiSelectCheckboxListItemClickEventData: MultiSelectCheckboxListItemClickEventData = {
      groupId,
      value,
      checked: target.checked
    };
    this.props.onClick(multiSelectCheckboxListItemClickEventData);
  }

  render() {
    const { name, value, labelString, checked, indeterminate, labelComponent, disabled, classes } = this.props;

    const checkboxProps: CheckboxProps = {
      indeterminate,
      className: classes.checkbox,
      color: 'primary',
      onClick: this.handleCheckboxClick
    };

    return (
      <ListItem key={`${name}-${labelString}`} dense={true}>
        <FormControlLabel
          name={name}
          disabled={disabled}
          label={labelComponent || labelString}
          value={value}
          checked={checked}
          control={<Checkbox {...checkboxProps} />}
        />
      </ListItem>
    );
  }
}

export default withStyles(styles)(MultiSelectCheckboxListItem);
