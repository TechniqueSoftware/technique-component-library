import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import LoggedInData from '@redux/global/components/loggedInData'
import { store } from '@redux/store'

import { DeviceProvider } from '@utils/device'

import * as parts from './parts'

const toArray = value => {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}
const parsePermissions = permissions => {
  if (!permissions || (!permissions.user && !permissions.feature)) return { user: [], feature: [] }
  const { user, feature } = permissions
  return { user: toArray(user), feature: toArray(feature) }
}

const renderDom = ({ id, props, Component, permissions, idsToHide }) => {
  ReactDOM.render(
    <Provider store={store}>
      <LoggedInData id={id} permissions={parsePermissions(permissions)} idsToHide={idsToHide}>
        <DeviceProvider>
          <Component {...props} />
        </DeviceProvider>
      </LoggedInData>
    </Provider>,
    document.getElementById(id)
  )
}

export default {
  posButton: o => renderDom({ ...o, Component: parts.PosButton }),
  scheduleAndScripts: o => renderDom({ ...o, Component: parts.ScheduleNScripts }),
  newPhoneInquiry: o => renderDom({ ...o, Component: parts.Inquiry }),
  manageTags: o => renderDom({ ...o, Component: parts.ManageTags })
}
