import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ message, meta }) => (
  <li className={meta.join(' ')}>
    {message}
  </li>
)
export default Message