import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ message, sent, meta }) => (
  <li className={` message ${sent === true ? "me" : "him"}`}>{message}</li>
)
export default Message