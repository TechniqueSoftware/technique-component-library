import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import { store } from '@redux/store'

import LoggedInData from '../global/components/loggedInData'

const Prov = ({ children }) => <Provider store={store}><LoggedInData>{children}</LoggedInData></Provider>

Prov.propTypes = {
  children: PropTypes.node
}

export default Prov
