import * as React from 'react';
import { mount } from 'enzyme';
import { TabsWithPanels, TabsWithPanelsProps } from './TabsWithPanels';
import { act } from 'react-dom/test-utils';

describe('TabsWithPanels', () => {

  let baseProps: TabsWithPanelsProps;
  beforeEach(() => {
    baseProps = {
      initialTab: '1',
      onTabChange: jest.fn(),
      tabAndPanelPropsList: [
        { renderContent: () => <span>mockTab1Content</span>, id: '1', label: 'mockTab1Label' },
        { renderContent: () => <span>mockTab2Content</span>, id: '2', label: 'mockTab1Label' },
        { renderContent: () => <span>mockTab3Content</span>, id: '3', label: 'mockTab1Label' }
      ],
      tabsAriaLabel: 'mockTestAriaLabel'
    };
  });

  test('should render with minimal props', () => {
    const props: TabsWithPanelsProps = { ...baseProps };
    const reactWrapper = mount(<TabsWithPanels {...props} />);
    const tabPanelContainers = reactWrapper.find('TabPanelContainer');
    // Only one tabPanelContainer should render initially.
    expect(tabPanelContainers.length).toBe(1);
    expect(reactWrapper.debug()).toMatchSnapshot();
  });

  test('should render a new content when clicking on tab', async () => {
    const props: TabsWithPanelsProps = { ...baseProps };
    const reactWrapper = mount(<TabsWithPanels {...props} />);
    const tab1Elements = reactWrapper.find('#tab-2').first();
    await act(async () => {
      tab1Elements.simulate('click');
    });

    reactWrapper.update();

    const tabPanelContainers = reactWrapper.find('TabPanelContainer');
    // Once a tab has done it's initial render it should still be rendered but not visible.
    expect(tabPanelContainers.length).toBe(2);
    expect(reactWrapper.debug()).toMatchSnapshot();
  });

});
