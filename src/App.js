
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
    lastMessageID: 0,
    log: '',
    nick: '',
    talkingTo: ''
  }
    
  handleSubmit (e){
    e.preventDefault()
    let messages = this.state.messages;
    let msgContent = this.state.inputValue;
    // check if the message is action or not
    msgContent = msgContent.trim()
    if (msgContent.startsWith('/')) {
      this.handleChatAction(msgContent)
    } else {
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
      })
      socket.emit(types.ADD_MESSAGE, msgContent)
    }
    this.clearInput();
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
          console.log('thimnk action ')
          /*
          var message = matches[2]
          socket.emit('think message', message)
          */
          break;
      case '/oops':
          /*          
          $('.sent:last-child').remove()
          socket.emit('removing message')
          break;
      case '/fadelast​':
          socket.emit('fadelast​')
          break;
      case '/highlight':
          var message = matches[2]
          socket.emit('highlight​', message)
          break;
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
      let messages = this.state.messages;
      messages.push({
        id: this.state.lastMessageID,
        message: data.message,
        sent: data.sent,
        meta: {}
      });
      var nextID = this.state.lastMessageID + 1;
      this.setState({
        messages,
        lastMessageID: nextID,
        log:'hello'
      }) 
    }.bind(this))
    socket.on(types.CHANGE_NICK, function(nick) {
      this.setState({
        talkingTo: nick
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