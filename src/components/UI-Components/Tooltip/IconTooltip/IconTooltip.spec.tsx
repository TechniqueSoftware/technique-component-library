import * as React from 'react';
import { shallow } from 'enzyme';
import { IconTooltip, IconTooltipProps } from './IconTooltip';
import HelpRounded from '@material-ui/icons/HelpRounded';

describe('IconTooltip', () => {
  test('should render with minimal props', () => {

    const iconTooltipProps: IconTooltipProps = {
      tooltipText: 'mock text',
      iconProps: { component: HelpRounded },
      placement: 'bottom-start',
    };
    const shallowWrapper = shallow(<IconTooltip {...iconTooltipProps} />);

    expect(shallowWrapper.debug()).toMatchSnapshot();

  });
});
