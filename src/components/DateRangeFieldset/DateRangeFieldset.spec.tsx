import DateRangeFieldset, { DateRangeFieldsetProps } from './DateRangeFieldset';
import * as React from 'react';
import moment from 'moment';
import { shallow } from 'enzyme';
import { CUSTOM_DATE_RANGE_VALUE, textCampaignDateRangeOptions } from './dateRangeFieldSetConstants';
import { DATE_FORMAT_ISO, DATE_FORMAT_MIDDLE_ENDIAN } from '../../constants/dateFormats';

describe('DateRangeFieldset', () => {

  function shallowRender(props: DateRangeFieldsetProps) {
    return shallow(<DateRangeFieldset {...props} />);
  }

  const getFreshProps = (): DateRangeFieldsetProps => {
    return {
      id: 'mockId',
      dateRangeLabel: 'mockLabel',
      dateRangeOptions: textCampaignDateRangeOptions,
      today: moment('01/01/2010', DATE_FORMAT_MIDDLE_ENDIAN),
      startDateProps: {
        onChange: jest.fn(),
        value: '01/01/2010'
      },
      endDateProps: {
        onChange: jest.fn(),
        value: '01/02/2010'
      },
      dateRangeProps: {
        value: 'Last7Days',
        onChange: jest.fn()
      }
    };
  };

  test('should render with minimal props', () => {
    const props = getFreshProps();
    const reactWrapper = shallowRender(props);
    expect(reactWrapper.debug()).toMatchSnapshot();
  });

  test('should set dateRange to custom when changing the date', () => {
    const props = getFreshProps();
    const reactWrapper = shallowRender(props);
    reactWrapper.find('[label="Start"]').simulate('change', { target: { value: '01/01/2019' } });
    expect((props.dateRangeProps.onChange as any).mock.calls[0][0]).toBe(CUSTOM_DATE_RANGE_VALUE);
  });

  test('should set onStartDateChange to yesterday when dateRange of yesterday', () => {
    const props = getFreshProps();
    const reactWrapper = shallowRender(props);
    reactWrapper.find('Select').simulate('change', { target: { value: 'yesterday' } });
    const yesterday = props.today.clone().subtract(1, 'day');
    expect((props.startDateProps.onChange as any).mock.calls[0][0]).toBe(yesterday.format(DATE_FORMAT_ISO));
    expect((props.endDateProps.onChange as any).mock.calls[0][0]).toBe(yesterday.format(DATE_FORMAT_ISO));
  });
});
