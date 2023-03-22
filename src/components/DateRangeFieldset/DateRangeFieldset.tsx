import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import createStyles from '@material-ui/styles/createStyles';
import MenuItem from '@material-ui/core/MenuItem';
import * as moment from 'moment';
import React, { useEffect, useMemo } from 'react';
import Select from '../Select/Select';
import { CUSTOM_DATE_RANGE_VALUE, DateRangeOption } from './dateRangeFieldSetConstants';
import { DATE_FORMAT_ISO } from '../../constants/dateFormats';
import { StartAndEndInput, StartAndEndInputProps } from '../StartAndEndInput/StartAndEndInput';

const useStyles = makeStyles(() =>
  createStyles({
    dateRangeSelect: {
      minWidth: 90
    }
  })
);

export interface DateRangeFieldsetInputProps {
  error?: boolean;
  helperText?: string;
  startDateHelperText?: string;
  endDateHelperText?: string;
  onChange: (value: string) => void;
  value: string;
  min?: string;
  max?: string;
}

export interface DateRangeFieldsetProps {
  id: string;
  dateRangeLabel: string;
  today: moment.Moment;
  dateRangeOptions: DateRangeOption[];
  dateRangeProps?: DateRangeFieldsetInputProps;
  startDateProps?: DateRangeFieldsetInputProps;
  endDateProps?: DateRangeFieldsetInputProps;
  // The label for the TextField relies on element being visible to determine the label width. This prop gives
  // us a way to indicate when the TextField is invisible and changing to visible so that we can recalculate the width.
  isInvisible?: boolean;
}

export default function DateRangeFieldset(props: DateRangeFieldsetProps) {

  const {
    id,
    dateRangeLabel,
    startDateProps,
    endDateProps,
    dateRangeProps,
    today,
    dateRangeOptions,
    isInvisible
  } = props;

  function handleDateRangeChange(value: string) {
    const dateRangeOption: DateRangeOption = dateRangeOptions.find((option) => option.value === value) || dateRangeOptions[0];
    if (dateRangeOption.calculateDateRange) {
      const dateRange = dateRangeOption.calculateDateRange(today);
      startDateProps.onChange(dateRange.start.format(DATE_FORMAT_ISO));
      endDateProps.onChange(dateRange.end.format(DATE_FORMAT_ISO));
    }
    dateRangeProps.onChange(value);
  }

  function handleStartDateChange(event: any) {
    handleDateRangeChange(CUSTOM_DATE_RANGE_VALUE);
    startDateProps.onChange(event.target.value);
  }

  function handleEndDateChange(event: any) {
    handleDateRangeChange(CUSTOM_DATE_RANGE_VALUE);
    endDateProps.onChange(event.target.value);
  }

  // If we start with a dateRange value treat it like a change to update the start and end date values
  useEffect(() => {
    const { value } = props.dateRangeProps;
    if (value) {
      handleDateRangeChange(value);
    }
  }, []);

  const sortedDateRangeOptions: DateRangeOption[] = useMemo(() => {
    return dateRangeOptions.sort((a, b) => a.sortPriority - b.sortPriority);
  }, [dateRangeOptions]);

  const classes = useStyles();

  const startAndEndInputProps: StartAndEndInputProps = {
    id,
    startDateProps,
    handleStartDateChange,
    handleEndDateChange,
    isInvisible,
    endDateProps,
    type: 'date'
  };

  return (<React.Fragment>
    <Grid item>
      <Select
        id={`${id}-select`}
        {...dateRangeProps}
        classes={{ root: classes.dateRangeSelect }}
        onChange={(event) => handleDateRangeChange(event.target.value as string)}
        name={'DateRange'}
        label={dateRangeLabel}
        isInvisible={isInvisible}
      >
        {sortedDateRangeOptions.map((rangeOption) => {
          const { value, label } = rangeOption;
          return (<MenuItem value={value} key={value}>
            {label}
          </MenuItem>);
        })}
      </Select>
    </Grid>
    {StartAndEndInput(startAndEndInputProps)}
  </React.Fragment>);
}
