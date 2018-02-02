import React from 'react'
import PropTypes from 'prop-types'
import Message from './Message'

class MessagesList extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return (
      <section id="messages-list">
        <ul className='cf'>
          {this.props.messages.map(message => (
            <Message
              key={message.id}
              {...message}
            />
        ))}
        </ul>
        <div className='dummy-message-end'
           ref={(el) => { this.messagesEnd = el; }}>
          &nbsp;
        </div>
      </section>
    )
  }
}

export default MessagesList