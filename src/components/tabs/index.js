import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import styles from './styles.module.scss'

const TabsContainer = ({ id, tabs, defaultActive, onTabSelect, tabUnderline, permission }) => {
  const [key, setKey] = useState(defaultActive)

  const handleTabSelect = key => {
    setKey(key)
    if (onTabSelect) { onTabSelect(key) }
  }

  return (
    <div>
      <Tabs
        id={id}
        activeKey={key}
        className={`${styles.tabs} ${tabUnderline ? styles.tabUnderline : ''}`}
        onSelect={handleTabSelect}
      >
        {tabs.map(({ id, title, disabled, content }, i) => (
          <Tab
            tabClassName={id === '1' && title?.props?.children === 'Copy Segments' && !permission ? 'd-none' : ''}
            className={`border border-top-0 rounded-bottom shadow-sm border-0 p-3 ${tabUnderline ? '' : 'shadow-sm'}`}
            key={id}
            eventKey={i}
            title={title}
            disabled={disabled}
          >
            {content}
          </Tab>
        ))}
      </Tabs>
    </div>
  )
}

TabsContainer.propTypes = {
  id: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      content: PropTypes.node
    })
  ),
  defaultActive: PropTypes.number,
  tabUnderline: PropTypes.bool,
  onTabSelect: PropTypes.func,
  permission: PropTypes.bool
  // type: PropTypes.oneOf(['line', 'folder'])  This one should be use when the other type of tabs is implemented
}

TabsContainer.defaultProps = {
  defaultActive: 0,
  tabs: [],
  tabUnderline: false
  // type: 'folder'
}

export default TabsContainer
