import SimplePopover, { SimplePopoverProps } from './SimplePopover';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('SimplePopover', () => {

  function renderShallow(props?: Partial<SimplePopoverProps>) {
    const baseProps: SimplePopoverProps = {
      targetComponent: <div>Mock target component</div>,
      ...props
    };

    return shallow(<SimplePopover {...baseProps} />);
  }

  test('should render with base props', () => {
    const shallowWrapper = renderShallow();
    expect(shallowWrapper.debug()).toMatchSnapshot();
  });

  test('should set popover to open when target wrapper is clicked', () => {
    const shallowWrapper = renderShallow();
    const target = shallowWrapper.find('[data-test="popover-target-wrapper"]').first();
    const currentTarget = {
      getBoundingClientRect: jest.fn(() => ({
        height: 999
      }))
    };
    target.simulate('click', { currentTarget });
    const popoverWrapper: any = shallowWrapper.find('WithStyles(ForwardRef(Popover))');
    expect(popoverWrapper.props().open).toBe(true);
    expect(popoverWrapper.props().anchorEl).toBe(currentTarget);
  });
});
