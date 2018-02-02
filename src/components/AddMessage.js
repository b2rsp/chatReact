import React from 'react'
import PropTypes from 'prop-types'

class AddMessage extends React.Component {
  
  render() { 
    return (
      <form className='textarea' onSubmit={this.props.handleSubmit}>
        <input type="text" value={this.props.inputValue} onChange={this.props.handleOnchange} placeholder='Type here...'/>
      </form>
    )
  }
}

AddMessage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleOnchange: PropTypes.func.isRequired,
  inputValue: PropTypes.string
}

export default AddMessage