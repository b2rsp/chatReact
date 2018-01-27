import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ message, sent, meta }) => (
  <p>
    <span className={` message ${sent === true ? "left" : "right"}`}>{message}</span>
  </p>
)

Message.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}

export default Message