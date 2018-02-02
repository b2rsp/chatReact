import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ message, meta }) => (
  <li 
    className={meta.join(' ') + ' speech-bubble'}
  >
    {message}
  </li>
)

Message.propTypes = {
  message: PropTypes.string,
  meta: PropTypes.object
};

export default Message