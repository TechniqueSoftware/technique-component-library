import * as React from 'react';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/styles/withStyles';
import { Theme } from '@material-ui/core';
import { colors } from '../../themes/clubOS';
import { createStyles } from '@material-ui/styles';

const styles = (theme: Theme) => createStyles({
  root: {
    fontSize: theme.typography.body2.fontSize,
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.common.white
  },
  input: {
    padding: theme.spacing(2),
    fontSize: theme.typography.body2.fontSize
  },
  inputNoLeftPad: {
    paddingLeft: 0
  },
  startIcon: {
    color: colors.icon.default(theme),
    paddingLeft: theme.spacing(2),
  }
});

/**
 * From T pick all properties except the set of properties K
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface TextInputProps extends Omit<FormControlProps, 'ref'> {
  'aria-label': string;
  value: string;
  placeholder?: string;
  classes?: {
    root: string,
    startIcon: string,
    input: string,
    inputNoLeftPad: string
  };
  startAdornmentIcon?: React.ReactElement;
  autoFocus?: boolean;
}

export class TextInput extends React.PureComponent<TextInputProps> {

  renderStartAdornment() {
    const { startAdornmentIcon, classes } = this.props;
    if (!startAdornmentIcon) return null;

    return (<InputAdornment position="start" classes={{ root: classes.startIcon }}>
      {startAdornmentIcon}
    </InputAdornment>);
  }

  render() {
    const {
      'aria-label': ariaLabel,
      classes,
      startAdornmentIcon,
      placeholder,
      autoFocus = false,
      ...rest
    } = this.props;
    const inputClasses = [
      classes.input,
      startAdornmentIcon && classes.inputNoLeftPad,
    ].filter(Boolean).join(' ');
    return (
      <FormControl fullWidth={true} classes={{ root: classes.root }} {...rest}>
        <Input
          inputProps={{
            'aria-label': ariaLabel
          }}
          placeholder={placeholder}
          classes={{ input: inputClasses }}
          fullWidth={true}
          autoFocus={autoFocus}
          startAdornment={this.renderStartAdornment()}
        />
      </FormControl>
    );
  }
}

export default withStyles(styles)(TextInput);
