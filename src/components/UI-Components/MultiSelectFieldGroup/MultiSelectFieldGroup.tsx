// @ts-nocheck
import * as React from 'react';
import clsx from 'clsx';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import withStyles from '@material-ui/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Theme } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import Box from '@material-ui/core/Box';
import MultiSelectSearchList, {
  MultiSelectGroupValueWrapper,
  MultiSelectOptionGroupData,
  MultiSelectSearchListProps
} from './MultiSelectSearchList/MultiSelectSearchList';

const styles = (theme: Theme) => ({
  helperText: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  helperTextError: {
    color: theme.palette.error.main,
  },
  // Empty placeholder, currently only the parent defines the searchContainer class.
  searchContainer: {}
});

export interface MultiSelectRadioInputProps {
  name: string;
  value: string | 'true' | 'false';
  label: string | React.ReactElement<any, any>;
}

export interface MultiSelectFieldGroupProps {
  onRadioGroupChange?: (event: React.ChangeEvent<{}>, value: string) => void;
  classes?: {
    searchContainer?: string;
    helperText?: string;
    helperTextError?: string;
    error?: string;
  };
  radioGroupProps?: {
    label: string;
    name: string;
    value: string;
  };
  showHelperText?: boolean;
  helperText?: React.ReactNode;
  error?: boolean;
  selectAllRadioInputProps?: MultiSelectRadioInputProps;
  selectSomeRadioInputProps?: MultiSelectRadioInputProps;
  showMultiSelectSearchList?: boolean;
  fieldSetLabelText?: string | React.ReactNode;
  showFieldSetLabelText?: boolean;
  multiSelectOptionGroupDataList: MultiSelectOptionGroupData[];
  groupValueWrapperList: MultiSelectGroupValueWrapper[];
  onCheckboxGroupChange: (groupValues: MultiSelectGroupValueWrapper[]) => void;
  showRadioGroup?: boolean;
  listContainerHeight?: number;
  readOnly?: boolean;
}

export class MultiSelectFieldGroup extends React.Component<MultiSelectFieldGroupProps> {

  static defaultProps: Partial<MultiSelectFieldGroupProps> = {
    showRadioGroup: false,
    showFieldSetLabelText: false,
    showHelperText: true
  };

  constructor(props: MultiSelectFieldGroupProps) {
    super(props);
    this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this);
  }

  renderRadioGroupOption(props: MultiSelectRadioInputProps) {
    const { readOnly } = this.props;
    const { value, label, name } = props;
    return (
      <FormControlLabel
        control={<Radio color={'primary'} />}
        label={label}
        value={value}
        name={name}
        disabled={readOnly} />
    );
  }

  handleRadioGroupChange(event: any, value: string) {
    const {
      onRadioGroupChange,
      onCheckboxGroupChange,
      groupValueWrapperList
    } = this.props;

    const copiedAndEmptiedGroupValues = groupValueWrapperList.map((group) => {
      const copiedGroup = { ...group };
      copiedGroup.values.clear();
      return group;
    });

    onCheckboxGroupChange(copiedAndEmptiedGroupValues);
    onRadioGroupChange(event, value);
  }

  renderRadioGroup() {
    const {
      selectAllRadioInputProps,
      selectSomeRadioInputProps,
      radioGroupProps,
      showRadioGroup,
    } = this.props;

    if (!showRadioGroup) return null;

    return (
      <FormControl component={'fieldset'}>
        <RadioGroup
          aria-label={radioGroupProps.label}
          name={radioGroupProps.name}
          value={radioGroupProps.value}
          onChange={this.handleRadioGroupChange}
        >
          {this.renderRadioGroupOption(selectAllRadioInputProps)}
          {this.renderRadioGroupOption(selectSomeRadioInputProps)}
        </RadioGroup>
      </FormControl>
    );
  }

  render() {
    const {
      classes,
      readOnly,
      error = false,
      multiSelectOptionGroupDataList,
      groupValueWrapperList,
      radioGroupProps,
      selectSomeRadioInputProps,
      showHelperText,
      helperText,
      fieldSetLabelText,
      showFieldSetLabelText,
      listContainerHeight,
      showMultiSelectSearchList,
      onCheckboxGroupChange,
    } = this.props;

    const someRadioOptionSelected = (showMultiSelectSearchList || (radioGroupProps && selectSomeRadioInputProps
       && radioGroupProps.value === selectSomeRadioInputProps.value));

    const multiSelectSearchListProps: MultiSelectSearchListProps = {
      readOnly,
      error,
      groupValueWrapperList,
      multiSelectOptionGroupDataList,
      onCheckboxGroupChange,
      listContainerHeight,
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
          <Grid item={true} xs={12}>
            {this.renderRadioGroup()}
          </Grid>
          {someRadioOptionSelected &&
          <Fade in={someRadioOptionSelected}>
            <Grid item className={clsx(classes.searchContainer)}>
              {showHelperText &&
              <FormHelperText
                className={clsx(classes.helperText, error && classes.helperTextError)}
              >{helperText}</FormHelperText>
              }
              <MultiSelectSearchList {...multiSelectSearchListProps} />
            </Grid>
          </Fade>
          }
        </Box>
      </React.Fragment>);
  }
}

export default withStyles(styles)(MultiSelectFieldGroup);
