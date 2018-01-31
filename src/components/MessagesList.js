import React from 'react'
import PropTypes from 'prop-types'
import Message from './Message'

const MessagesList = ({ messages }) => (
  <section id="messages-list">
    <ul className='cf'>
      {messages.map(message => (
        <Message
          key={message.id}
          {...message}
        />
    ))}
    </ul>
  </section>
)
export default MessagesList