import * as React from 'react';
// tslint:disable-next-line:no-duplicate-imports
import { useState } from 'react';
import { createCUICStoriesOf } from '../../utils/utils';
import { MODULE_NAME } from '../constants';
import { clubOsTheme, DateRangeFieldset, DateRangeFieldsetProps } from '@clubos-ui-components/core';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Grid from '@material-ui/core/Grid';
import * as moment from 'moment';
import { boolean, select, text } from '@storybook/addon-knobs';
import { analytics30DaysRangeOptions } from '../../components/DateRangeFieldset/dateRangeFieldSetConstants';

require('moment-timezone');

function DateRangeFieldsetStory() {
  const [dateRange, setDateRange] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const timezone = select('timezone', ['America/Anchorage',
    'America/Puerto_Rico',
    'America/Chicago',
    'Asia/Kuwait',
    'America/New_York',
    'US/Hawaii',
    'America/Denver',
    'America/Los_Angeles',
    'America/Phoenix',
    'America/Regina',
    'America/St_Johns'], 'America/Chicago');

  const datetime = text('date/time', moment().format('YYYY-MM-DDThh:mm:ss'));
  // @ts-ignore
  const today = moment(datetime, moment.ISO_8601).tz(timezone);

  const helperText = text('Helper text', '');
  const startDateHelperText = text('Start date helper text', '');
  const endDateHelperText = text('End date helper text', '');
  const error = boolean('With error', false);

  const props: DateRangeFieldsetProps = {
    today,
    dateRangeLabel: 'Date Range',
    id: 'dateRangeId',
    dateRangeOptions: analytics30DaysRangeOptions,
    dateRangeProps: {
      error,
      value: dateRange,
      onChange: setDateRange,
    },
    startDateProps: {
      error,
      helperText,
      startDateHelperText,
      value: startDate,
      onChange: setStartDate,
      min: moment().subtract('day', 31).format('YYYY-MM-DD'),
      max: moment().format('YYYY-MM-DD')
    },
    endDateProps: {
      error,
      helperText,
      endDateHelperText,
      value: endDate,
      onChange: setEndDate,
      min: moment().subtract('day', 31).format('YYYY-MM-DD'),
      max: moment().format('YYYY-MM-DD')
    },
  };

  console.log('Converted datetime: ', today.toISOString());
  return (
    <div>
      <ThemeProvider theme={clubOsTheme}>
        <Grid container spacing={1}>
          <DateRangeFieldset {...props} />
        </Grid>
      </ThemeProvider>
    </div>
  );
}

createCUICStoriesOf(MODULE_NAME.INPUTS, module)
  .addCUICStory({
    render: () => {
      return (<DateRangeFieldsetStory />);
    },
    name: 'DateRangeFieldset',
    notes: require('./notes.md').default
  });
