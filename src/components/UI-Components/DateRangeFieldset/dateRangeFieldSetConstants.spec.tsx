import {
  textCampaignDateRangeOptions,
  analyticsDateRangeOptions,
  DateRangeOption,
  emailCampaignDateRangeOptions
} from './dateRangeFieldSetConstants';
import { DATE_FORMAT_ISO, DATE_FORMAT_MIDDLE_ENDIAN } from '../constants/dateFormats';
import moment from 'moment';

describe('dateRangeFieldSetConstants', () => {

  function testDateRangeOptions(dateRangeOptions: DateRangeOption[]) {
    const results = dateRangeOptions.map((option) => {
      let calculateDateRange: { start: moment.Moment; end: moment.Moment };
      if (option.calculateDateRange) {
        calculateDateRange = option.calculateDateRange(moment('2019-01-20 06:66:66Z', DATE_FORMAT_ISO));
      }

      let formattedRange;
      if (calculateDateRange) {
        const { start, end } = calculateDateRange;
        formattedRange = {
          start: start && start.format(DATE_FORMAT_MIDDLE_ENDIAN),
          end: end && end.format(DATE_FORMAT_MIDDLE_ENDIAN)
        };
      }
      return [option.label, formattedRange];
    });
    expect(results).toMatchSnapshot();
  }

  test('textCampaignDateRangeOptions calculated date range should match snapshot', () => {
    testDateRangeOptions(textCampaignDateRangeOptions);
  });

  test('emailCampaignDateRangeOptions calculated date range should match snapshot', () => {
    testDateRangeOptions(emailCampaignDateRangeOptions);
  });

  test('analyticsDateRangeOptions calculated date range should match snapshot', () => {
    testDateRangeOptions(analyticsDateRangeOptions);
  });
});
