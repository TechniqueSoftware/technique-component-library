import * as React from 'react';
import withStyles from '@material-ui/styles/withStyles';
import { Theme } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MultiSelectStandardSearchList, { MultiSelectStandardOptions, MultiSelectSearchListProps } from './MultiSelectStandardSearchList/MultiSelectStandardSearchList';

const styles = (theme: Theme) => ({
  helperText: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  helperTextError: {
    color: theme.palette.error.main,
  },
});

export interface MultiSelectStandardFieldGroupProps {
  classes?: {
    helperText?: string;
    helperTextError?: string;
    error?: string;
  };
  fieldSetLabelText?: string | React.ReactNode;
  showFieldSetLabelText?: boolean;
  label: string;
  disabled: boolean;
  selectMaxWidth: number;
  listContainerHeight?: number;
  multiSelectStandardFieldProps?: MultiSelectStandardOptions[];
  onCheckboxGroupChange?: (groupValues: MultiSelectStandardOptions[]) => void;
}

export class MultiSelectStandardField extends React.Component<MultiSelectStandardFieldGroupProps> {
  static defaultProps: Partial<MultiSelectStandardFieldGroupProps> = {
    showFieldSetLabelText: false,
  };

  render() {
    const {
      disabled,
      fieldSetLabelText,
      showFieldSetLabelText,
      listContainerHeight,
      selectMaxWidth,
      onCheckboxGroupChange,
      multiSelectStandardFieldProps,
    } = this.props;

    const multiSelectSearchListProps: MultiSelectSearchListProps = {
      disabled,
      onCheckboxGroupChange,
      listContainerHeight,
      selectMaxWidth,
      multiSelectStandardFieldProps
    };

    const fieldSetVariant = showFieldSetLabelText ? undefined : 'srOnly';

    return (
      <React.Fragment>
        <Box component={'fieldset'} border="none" p={0} m={0}>
          <Typography variant={fieldSetVariant} component="span">
            <FormLabel required component={'legend'}>
              {fieldSetLabelText}
            </FormLabel>
          </Typography>
          <MultiSelectStandardSearchList {...multiSelectSearchListProps} />
        </Box>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(MultiSelectStandardField);
