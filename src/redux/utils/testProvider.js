import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import { store as initStore } from '@redux/store'

const Prov = ({ children, store }) => <Provider store={store}>{children}</Provider>

Prov.propTypes = {
  children: PropTypes.node,
  store: PropTypes.object
}

Prov.defaultProps = {
  store: initStore
}

export default Prov
