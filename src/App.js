
import React from 'react';
import './App.css';
import MessagesList from './components/MessagesList';
import AddMessage from './components/AddMessage';
import socketIOClient from "socket.io-client";
import * as types from './constants/ActionTypes';
import { FADELAST } from './constants/ActionTypes';

const socket = socketIOClient('http://localhost:8089');
class App extends React.Component {
  constructor(props) {
    super(props)
  }
 
  state = {
    messages: [],
    inputValue: '',
    log: '',
    nick: '',
    talkingTo: ''
  }
    
  handleSubmit (e){
    e.preventDefault()
    let msgContent = this.state.inputValue;
    // check if the message is action or not
    msgContent = msgContent.trim()
    if (msgContent.startsWith('/')) {
      this.handleChatAction(msgContent)
    } else {
      this.addChatMessage(msgContent, true)
      socket.emit(types.ADD_MESSAGE, msgContent) 
    }
    this.clearInput();
  }

  addChatMessage (message, sent, meta = []) {
    let messages = this.state.messages;
    sent ? meta.push('me') : meta.push('him');
    messages.push({
      id: (new Date).getTime(),
      message,
      meta
    });
    this.setState({
      messages
    })
    
  }

  handleChatAction(rawMessage) {
    const re = /(\/\S*)(.*)/g
    const matches = re.exec(rawMessage)
    const action = matches[1]
    switch (action) {
      case '/nick':
        let nick = matches[2]
        this.setState({
          nick: nick
        })
        socket.emit(types.CHANGE_NICK, nick)
        break;
      case '/think':
        let message = matches[2]
        this.addChatMessage(message, true, ['think'])
        socket.emit(types.THINK, message)
        break;
      case '/oops':
        socket.emit(types.REMOVE_LAST_MESSAGE)
        break;
      case '/fadelast':
        socket.emit(types.FADELAST)
        break;
      case '/highlight':
        var message = matches[2]
        socket.emit('highlight​', message)
        break;
      /*  
      case '/countdown​':
          //@ need to check if its a number
          //@ need to check if its a proper URL
          console.log('the machtes are ', matches[2])
          var elements = matches[2].trim().split(' ')
          var data = {
              number: elements[0],
              url: elements[1]
          }
          socket.emit('countdown​', data)
          break;
          */
      default:
          this.logMessage('That action isnt possible')
          break;
    }
  }
  
  logMessage(log) {
    this.setState({
      log
    })
  }

  clearInput() {
    this.setState({
      inputValue: ''
    })
  }

  handleOnchange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }
  componentDidMount() {
    // this set state from ajax calls or localstorage
    socket.on(types.ADD_MESSAGE, function (data){
      this.addChatMessage(data.message, data.sent)
    }.bind(this))
    socket.on(types.CHANGE_NICK, function(nick) {
      this.setState({
        talkingTo: nick
      })
    }.bind(this))
    socket.on(types.THINK, function(data){
      this.addChatMessage(data.message, data.sent, data.meta)
    }.bind(this))
    socket.on(types.REMOVE_LAST_MESSAGE, function() {
      let messagesLastRemoved = this.state.messages.splice(-1,1)
      this.setState({
        messages: messagesLastRemoved
      })
    }.bind(this))
    socket.on(types.FADELAST, function(){
      let messages = this.state.messages
      let lastMessage = messages[messages.length-1]
      console.log('lastmessage,', lastMessage)
      lastMessage.meta.push('fade-message')
      console.log('after', lastMessage)
      messages[messages.length-1] = lastMessage
      this.setState({
        messages
      })
    }.bind(this))
  }
  
  render() {
    return (<div id="container">
      <section className='sidebar'>
        <div>My nick: {this.state.nick}</div>
        <div>Talking to: {this.state.talkingTo}</div>
      </section>
      <section className="main">
        <MessagesList messages={this.state.messages}/>
        <AddMessage 
          handleSubmit={this.handleSubmit.bind(this)} 
          inputValue={this.state.inputValue} 
          handleOnchange={this.handleOnchange.bind(this)}/>
      </section>
      <section className='logHandling'>
        <div>
          {this.state.log}
        </div>
      </section>
    </div>
  )}
}
export default App