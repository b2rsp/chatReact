import React from 'react'
import PropTypes from 'prop-types'
class AddMessage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() { 
    return (
      <form onSubmit={this.props.handleSubmit}>
        <input type="text" value={this.props.inputValue} onChange={this.props.handleOnchange}/>
      </form>
    )
  }
}  

export default AddMessage