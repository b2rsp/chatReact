
import React from 'react';
import './App.css';
import MessagesList from './components/MessagesList';
import AddMessage from './components/AddMessage';
import socketIOClient from "socket.io-client";
import * as types from './constants/ActionTypes';

const socket = socketIOClient('http://localhost:8089');
class App extends React.Component {
  constructor(props) {
    super(props)
  }
 
  state = {
    messages: [],
    inputValue: '',
    lastMessageID: 0
  }
  
  componentDidMount() {

  }
  
  handleSubmit (e){
    e.preventDefault()
    let messages = this.state.messages;
    let msgContent = this.state.inputValue;
    // check if the message is action or not
    messages.push({
      id: this.state.lastMessageID,
      message: msgContent,
      sent: true,
      meta: {}
    }); 
    var nextID = this.state.lastMessageID + 1;
    this.setState({
      messages,
      lastMessageID: nextID,
      inputValue: ''
    })
    console.log('ONE')
    socket.emit(types.ADD_MESSAGE, msgContent)
  }

  handleOnchange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }
  componentDidMount() {
    // this set state from ajax calls or localstorage
    socket.on(types.ADD_MESSAGE, function(data){
      let messages = this.state.messages;
      messages.push({
        id: this.state.lastMessageID,
        message: data.message,
        sent: data.sent,
        meta: {}
      });
      console.log('messages', messages)
      var nextID = this.state.lastMessageID + 1;
      this.setState({
        messages,
        lastMessageID: nextID,
      }) 
    }.bind(this))
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