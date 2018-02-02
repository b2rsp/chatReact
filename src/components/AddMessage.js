import React from 'react'
import PropTypes from 'prop-types'
class AddMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() { 
    return (
      <form className='textarea' onSubmit={this.props.handleSubmit}>
        <input type="text" value={this.props.inputValue} onChange={this.props.handleOnchange} placeholder='Type here...'/>
      </form>
    )
  }
}  

export default AddMessage