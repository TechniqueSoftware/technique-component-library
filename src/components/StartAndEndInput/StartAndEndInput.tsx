import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/styles/createStyles';
import { DateInput } from '../DateInput/DateInput';
import { TimeInput } from '../TimeInput/TimeInput';
import { colors } from '../../themes/clubOS';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: colors.icon.default(theme),
      position: 'relative',
      top: theme.spacing(2)
    },
    dateInput: {
      width: theme.spacing(22)
    },
  })
);

export interface StartAndEndInputFieldProps {
  error?: boolean;
  helperText?: string;
  startDateHelperText?: string;
  endDateHelperText?: string;
  value: string;
  min?: string;
  max?: string;
}

export type StartAndEndInputProps = {
  id: string;
  startDateProps: StartAndEndInputFieldProps;
  handleStartDateChange: (event: any) => void;
  isInvisible: boolean;
  endDateProps: StartAndEndInputFieldProps;
  handleEndDateChange: (event: any) => void;
  type: 'time' | 'date';
  variant?: 'filled' | 'standard' | 'outlined' | undefined | any;
};

export function StartAndEndInput(props: StartAndEndInputProps) {
  const {
    id,
    startDateProps,
    handleStartDateChange,
    isInvisible,
    endDateProps,
    handleEndDateChange,
    type,
    variant
  } = props;

  const [maxDate, setMaxDate] = React.useState('');

  React.useEffect(() => {
    if (startDateProps.value) {
      setMaxDate(startDateProps.value);
    } else {
      setMaxDate(startDateProps.max);
    }
  }, [props]);

  const Component = type === 'date' ? DateInput : TimeInput;
  const classes = useStyles();

  return <>
    <Grid item>
      <Component
        id={`${id}-start`}
        value={startDateProps.value}
        error={startDateProps.error}
        helperText={startDateProps.helperText || startDateProps.startDateHelperText || ''}
        onChange={handleStartDateChange}
        classes={{ root: classes.dateInput }}
        margin="dense"
        InputLabelProps={{
          shrink: true,
        }}
        label="Start"
        isInvisible={isInvisible}
        variant={variant || 'outlined'}
        InputProps={{ inputProps: { min: startDateProps.min, max: startDateProps.max } }}
      />
    </Grid>
    <Grid item>
      <Grid container>
        <Grid item>
          <ArrowRightAlt className={classes.icon} />
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Component
        id={`${id}-end`}
        value={endDateProps.value}
        error={endDateProps.error}
        helperText={endDateProps.helperText || endDateProps.endDateHelperText || ''}
        onChange={handleEndDateChange}
        classes={{ root: classes.dateInput }}
        InputLabelProps={{
          shrink: true,
        }}
        margin="dense"
        label="End"
        isInvisible={isInvisible}
        variant={variant || 'outlined'}
        InputProps={{ inputProps: { min: maxDate, max: endDateProps.max } }}
      />
    </Grid>
  </>;
}
