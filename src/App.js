
import React from 'react'
import './App.css'
import MessagesList from './components/MessagesList'
import AddMessage from './components/AddMessage';

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    messages: [],
    inputValue: '',
    lastMessageID: 0
  }
  
  handleSubmit (e){
    e.preventDefault()
    let messages = this.state.messages
    
    messages.push({
      id: this.state.lastMessageID,
      message: this.state.inputValue,
      sent: true,
      meta: {}
    }) 
    var nextID = this.state.lastMessageID + 1;
    this.setState({
      messages,
      lastMessageID: nextID,
      inputValue: ''
      })
  }

  handleOnchange(e) {
    console.log('e', e.target.value)
    this.setState({
      inputValue: e.target.value,
    });
  }
  componentDidMount() {
    // this set state from ajax calls or localstorage
    
  }

  render() {
  return (<div id="container">
    <section id="main">
      <MessagesList messages={this.state.messages}/>
      <AddMessage 
        handleSubmit={this.handleSubmit.bind(this)} 
        inputValue={this.state.inputValue} 
        handleOnchange={this.handleOnchange.bind(this)}/>
    </section>
  </div>
  )}
}
export default App