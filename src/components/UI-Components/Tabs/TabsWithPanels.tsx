import * as React from 'react';
import { Tabs } from './Tabs';
import { Tab } from './Tab';
import Typography from '@material-ui/core/Typography/Typography';
import Paper from '../Paper/Paper';

const { useState, useEffect } = React;
type TabAndPanelProps = { id: string, label: string, renderContent: (isActiveTab: boolean) => React.ReactNode };

export function TabPanelContainer(props: { id: string, isActive: boolean, children: React.ReactNode }) {
  const { id, isActive, children } = props;
  const hidden = !isActive;
  return <Typography
      component="div"
      role="tabpanel"
      hidden={hidden}
      id={`panel-${id}`}
      aria-labelledby={`panel-${id}`}
    >
      {children}
  </Typography>;
}

export type TabsWithPanelsProps = {
  tabAndPanelPropsList: TabAndPanelProps[],
  tabsAriaLabel: string,
  initialTab?: string;
  onTabChange?: (tabId: string) => void;
};

export function TabsWithPanels(props: TabsWithPanelsProps) {

  const {
    tabAndPanelPropsList,
    tabsAriaLabel,
    initialTab,
    onTabChange
  } = props;

  const getInitialTab = () => initialTab || tabAndPanelPropsList[0] && tabAndPanelPropsList[0].id || '';

  const [currentTab, setCurrentTab] = useState<string>(getInitialTab);
  const [initializedTabs, setInitializedTabs] = useState<Set<string>>(new Set());
  useEffect(() => {
    initializedTabs.add(currentTab);
    setInitializedTabs(initializedTabs);
  }, [currentTab]);

  function handleTabChange(event: any, value: string) {
    setCurrentTab(value);
    // Report the tab change to the parent component in case it needs to do something based on the change like update the queryParams to
    // represent the current location.
    if (onTabChange) {
      onTabChange(value);
    }
  }

  /**
   * We only want to render the currentTab or any tabs that have been rendered previously.
   */
  function renderPanelContentIfInitialized(panelContentList: TabAndPanelProps[], activeTabId: string) {
    return panelContentList.map((props) => {
      const { id, renderContent } = props;
      const isCurrentTab = activeTabId === id;
      if (isCurrentTab || initializedTabs.has(id)) {
        return <TabPanelContainer isActive={isCurrentTab} id={id} key={id}>
          {renderContent(isCurrentTab)}
        </TabPanelContainer>;
      }
    });
  }

  function renderTabs(tabPropsList: { id: string, label: string }[]) {
    return tabPropsList.map((props: any) => {
      const { id, label } = props;
      const tabId = `tab-${id}`;
      const tabProps = {
        label,
        id: tabId,
        key: tabId,
        'aria-controls': id,
        value: id
      };
      return <Tab {...tabProps} />;
    });
  }

  return (
    <Paper>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label={tabsAriaLabel}
          // Using useStyles to apply this style seemed to cause a bug where not all the tabs would display. Using inline styles seems
          // to work fine. I don't think it's worth the time to debug the issue.
          style={{ borderBottom: '1px solid #ddd' }}
        >
          {renderTabs(tabAndPanelPropsList)}
        </Tabs>
      {renderPanelContentIfInitialized(tabAndPanelPropsList, currentTab)}
    </Paper>);
}
