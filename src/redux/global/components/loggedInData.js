import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Spinner from 'react-bootstrap/Spinner'
import { useDispatch, useSelector } from 'react-redux'

import { objectIsEmpty } from '@utils'

import { GLOBAL_ACTIONS, GLOBAL_SELECTOR, Manager } from '..'

const checkPermissions = (permissions, currentPermissions, key) => {
  const requirePermissions = permissions[key] && permissions[key].length
  if (!requirePermissions) return true
  return permissions[key].every(p => currentPermissions[key].some(up => up.permissionName === p && up.permissionEffect === 'ALLOW')) // eslint-disable-line max-len
}

const LoggedInData = ({ children, id, needsClubAndLocations, restrictedFromRoles, permissions, idsToHide }) => {
  const dispatch = useDispatch()
  const [renderComponent, setRenderComponent] = useState(false)
  const [restricted, setRestricted] = useState(false)
  const [permitted, setPermitted] = useState(false)

  const loading = useSelector(GLOBAL_SELECTOR.LOADING)
  const user = useSelector(GLOBAL_SELECTOR.USER)
  const currentPermissions = useSelector(GLOBAL_SELECTOR.PERMISSIONS)

  useEffect(() => {
    const currentLocation = document.getElementById(id)?.getAttribute('current-location') || null
    dispatch(GLOBAL_ACTIONS.DATA.GET({ needsClubAndLocations, data: { currentLocation } }))
  }, [id])

  useEffect(() => {
    setRestricted(restrictedFromRoles.includes(user?.role?.id))
  }, [user, restrictedFromRoles])

  useEffect(() => {
    if (objectIsEmpty(currentPermissions)) return
    const hasFeaturePermissions = checkPermissions(permissions, currentPermissions, 'feature')
    const hasUserPermissions = checkPermissions(permissions, currentPermissions, 'user')
    setPermitted(hasFeaturePermissions && hasUserPermissions)
  }, [currentPermissions])

  useEffect(() => {
    const renderComponentBoolean = !restricted && permitted && !objectIsEmpty(user)
    setRenderComponent(renderComponentBoolean)
    idsToHide.forEach(idToHide => {
      const elementToHide = document.getElementById(idToHide)
      if (!elementToHide) return
      elementToHide.style.display = renderComponentBoolean ? 'none' : 'block'
    })
  }, [restricted, permitted, user])
  return (
    <Manager>
      {renderComponent ? (
        <div className='pkg-library'>{loading ? <Spinner animation='border' role='status' /> : children}</div>
      ) : null}
    </Manager>
  )
}

LoggedInData.propTypes = {
  children: PropTypes.node.isRequired,
  needsClubAndLocations: PropTypes.bool,
  restrictedFromRoles: PropTypes.array,
  id: PropTypes.string,
  idsToHide: PropTypes.arrayOf(PropTypes.string),
  permissions: PropTypes.shape({
    user: PropTypes.arrayOf(PropTypes.string),
    feature: PropTypes.arrayOf(PropTypes.string)
  })
}

LoggedInData.defaultProps = {
  idsToHide: [],
  needsClubAndLocations: true,
  restrictedFromRoles: ['1'],
  permissions: { user: [], feature: [] }
}

export default LoggedInData
