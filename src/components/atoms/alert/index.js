import React from 'react'
import PropTypes from 'prop-types'

import { Alert } from 'react-bootstrap'

// eslint-disable-next-line max-len
const renderAlertLink = (user, text) => user ? `<a class="alert-link" href="#" onclick="delegate(${user.userId}, '/action/Dashboard')"; return false;" role="button" tabindex="0">${user.firstName} ${user.lastName}</a> ${text}` : ''

const renderErrorAlerts = errorsObject => (
  <>
    <p><strong>There was an error please update the following:</strong></p>
    <ul>
      { Object.keys(errorsObject).map((key, i) => {
        if (key !== 'code' && key !== 'status') {
          return <li key={i}>{key}: {errorsObject[key]}</li>
        }
        return ''
      })}
    </ul>
  </>
)

const renderBackendError = alertData => (
  // eslint-disable-next-line max-len
  <p>{ alertData.message || 'The event you tried to schedule was not successful, please go to the lead’s calendar and schedule manually.'}</p>
)

const renderNewUserAlert = newUserData => {
  const { userId, firstName, lastName } = newUserData
  const linkData = renderAlertLink({ userId, firstName, lastName }, 'has been added!')
  // eslint-disable-next-line react/no-danger
  return <p><strong dangerouslySetInnerHTML={{ __html: linkData }} /></p>
}

const renderUserExistsAlert = userData => {
  const linkData = renderAlertLink(userData.user, 'already exists!')
  // eslint-disable-next-line react/no-danger
  return <p><strong dangerouslySetInnerHTML={{ __html: linkData }} /></p>
}
const renderAlert = alertData => {
  switch (alertData.code) {
    case 'FORM_SUBMISSION_ERROR': return renderErrorAlerts(alertData)
    case 'BAD_REQUEST': return renderBackendError(alertData)
    case 'DUPLICATE_USER': return renderUserExistsAlert(alertData)
    case 'INVALID_ATTENDEE': return renderBackendError(alertData)
    case 'SUCCESS': return renderNewUserAlert(alertData)
    case 'INVALID_OWNER_LOCATION': return renderBackendError(alertData)
    case undefined: return renderBackendError(alertData)
    default: return true
  }
}

const renderVariant = alertCode => {
  switch (alertCode) {
    case 'SUCCESS': return 'success'
    case 'DUPLICATE_USER': return 'warning'
    case 'FORM_SUBMISSION_ERROR': return 'danger'
    case 'BAD_REQUEST': return 'danger'
    case 'INVALID_ATTENDEE': return 'danger'
    case 'INVALID_OWNER_LOCATION': return 'danger'
    case undefined: return 'danger'
    default: return true
  }
}

// eslint-disable-next-line max-len
const SubmitAlert = ({ alertData }) => (alertData) ? <Alert variant={renderVariant(alertData.code)}>{renderAlert(alertData)}</Alert> : ''

SubmitAlert.propTypes = {
  alertData: PropTypes.shape({
    status: PropTypes.number,
    code: PropTypes.string
  })
}

export default SubmitAlert
