import { StartAndEndInput, StartAndEndInputProps } from './StartAndEndInput';
import * as React from 'react';
import { shallow, mount } from 'enzyme';

describe('StartAndEndInput', () => {
  test('should render with minimal props', () => {
    const startAndEndInputTimeProps: StartAndEndInputProps = {
      handleEndDateChange: jest.fn(),
      handleStartDateChange: jest.fn(),
      id: 'StartAndEntInputId',
      isInvisible: false,
      startDateProps: {
        value: '01/01/2010'
      },
      endDateProps: {
        value: '01/02/2010'
      },
      type: 'date'
    };

    const startAndEndInputDateProps: StartAndEndInputProps = {
      ...startAndEndInputTimeProps,
      startDateProps: {
        value: '13:03'
      },
      endDateProps: {
        value: '13:08'
      },
      type: 'time',
    };

    const shallowTimeWrapper = shallow(<StartAndEndInput {...startAndEndInputTimeProps} />);
    const shallowDateWrapper = shallow(<StartAndEndInput {...startAndEndInputDateProps} />);
    expect(shallowTimeWrapper.debug()).toMatchSnapshot();
    expect(shallowDateWrapper.debug()).toMatchSnapshot();
  });

  test('should render with different helper text for start and end dates', () => {
    const startAndEndInputDateProps: StartAndEndInputProps = {
      handleEndDateChange: jest.fn(),
      handleStartDateChange: jest.fn(),
      id: 'StartAndEntInputId',
      isInvisible: false,
      startDateProps: {
        value: '01/01/2010',
        startDateHelperText: 'start date'
      },
      endDateProps: {
        value: '01/02/2010',
        endDateHelperText: 'end date'
      },
      type: 'date'
    };

    const wrapper = mount(<StartAndEndInput {...startAndEndInputDateProps} />);
    const startHelperLabel = wrapper.find(`[id="${startAndEndInputDateProps.id}-start-helper-text"]`);
    const endHelperLabel = wrapper.find(`[id="${startAndEndInputDateProps.id}-end-helper-text"]`);

    expect(startHelperLabel.first().html()).toContain('start date');
    expect(endHelperLabel.first().html()).toContain('end date');
  });

  test('should render with same helper text for start and end dates when "startDateHelperText" and "endDateHelperText" passed', () => {
    const startAndEndInputDateProps: StartAndEndInputProps = {
      handleEndDateChange: jest.fn(),
      handleStartDateChange: jest.fn(),
      id: 'StartAndEntInputId',
      isInvisible: false,
      startDateProps: {
        value: '01/01/2010',
        startDateHelperText: 'start date',
        helperText: 'same helper text'
      },
      endDateProps: {
        value: '01/02/2010',
        endDateHelperText: 'end date',
        helperText: 'same helper text'
      },
      type: 'date'
    };

    const wrapper = mount(<StartAndEndInput {...startAndEndInputDateProps} />);
    const startHelperLabel = wrapper.find(`[id="${startAndEndInputDateProps.id}-start-helper-text"]`);
    const endHelperLabel = wrapper.find(`[id="${startAndEndInputDateProps.id}-end-helper-text"]`);

    expect(startHelperLabel.first().html()).toContain('same helper text');
    expect(endHelperLabel.first().html()).toContain('same helper text');
  });
});
