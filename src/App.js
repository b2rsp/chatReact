
import React from 'react';
import './App.css';
import MessagesList from './components/MessagesList';
import AddMessage from './components/AddMessage';
import Header from './components/Header';
import socketIOClient from "socket.io-client";
import * as types from './constants/ActionTypes';
import * as ReactDOM from 'react-dom';

const socket = socketIOClient('http://localhost:8089');
class App extends React.Component {
 
  state = {
    messages: [],
    inputValue: '',
    nick: '',
    talkingTo: ''
  }
    
  handleSubmit (e){
    e.preventDefault()
    let msgContent = this.state.inputValue;
    if (msgContent == '') return
    msgContent = msgContent.trim()
    // check if there is action to happen for the message
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
    message = this.addEmoticon(message);
    messages.push({
      id: new Date().getTime(),
      message,
      meta
    });
    this.setState({
      messages
    });
    this.saveLocalCollection();
  }

  addEmoticon(oldMessage) {
    //@TODO this need to improved and use the html entity for the wink (&#x1F609;) and smile (&#x1F600;)
    return oldMessage.replace('(smile)', '😀').replace('(wink)', '😉')
  }

  handleChatAction(rawMessage) {
    const re = /(\/\S*)(.*)/g
    const matches = re.exec(rawMessage)
    let message = matches[2]
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
        this.addChatMessage(message, true, ['think'])
        socket.emit(types.THINK, message)
        break;
      case '/oops':
        socket.emit(types.REMOVE_LAST_MESSAGE);
        break;
      case '/fadelast':
        socket.emit(types.FADELAST);
        break;
      case '/highlight':
        this.addChatMessage(message, true, ['highlight']);
        socket.emit(types.HIGHLIGHT, message);
        break; 
      case '/countdown':
          //@TODO need to check if its a number
          //@TODO need to check if its a proper URL
          let elements = matches[2].trim().split(' ')
          let data = {
              number: elements[0],
              url: elements[1]
          }
          socket.emit(types.COUNTDOWN, data)
          break;
      default:
         //@TODO inform user that this action isnt possible
          break;
    }
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

  loadLocalCollection() {
    if(localStorage.getItem('chatMessages')) {
      this.setState({
        messages: JSON.parse(localStorage.getItem('chatMessages'))
      })
    }
  }

  saveLocalCollection() {
    // only store the last 10, it should be on configuration the number
    let messages = this.state.messages.slice(-10)
    localStorage.setItem('chatMessages', JSON.stringify(messages))
  }

  componentDidMount() {
    // setup the localstorage
    this.loadLocalCollection()
    // setup the sockets
    socket.on(types.ADD_MESSAGE, function (data){
      this.addChatMessage(data.message, data.sent)
    }.bind(this))
    socket.on(types.CHANGE_NICK, function(nick) {
      // not completely sure if the it's the page title or just to add a vid on top of the chat , i will do both
      document.title = `Talking to ${nick}`
      this.setState({
        talkingTo: nick
      })
    }.bind(this))
    socket.on(types.THINK, function(data){
      this.addChatMessage(data.message, data.sent, data.meta)
    }.bind(this))
    socket.on(types.REMOVE_LAST_MESSAGE, function() {
      let messagesCollection = this.state.messages
      //remove last element
      messagesCollection.splice(-1,1)
      this.setState({
        messages: messagesCollection
      })
      this.saveLocalCollection()
    }.bind(this))
    socket.on(types.FADELAST, function(){
      let messages = this.state.messages
      let lastMessage = messages[messages.length-1]
      lastMessage.meta.push('fade-message')
      messages[messages.length-1] = lastMessage
      this.setState({
        messages
      })
    }.bind(this))
    socket.on(types.HIGHLIGHT, function(data){
      this.addChatMessage(data.message, data.sent, data.meta)
    }.bind(this))
    socket.on(types.COUNTDOWN, function(data){
      setTimeout(function(){
          window.open(data.url) 
      }, data.number * 1000);
    }.bind(this))
  }
  
  render() {
    return (<div className="container">
      <Header 
        talkingTo={this.state.talkingTo}
      />
      <MessagesList 
        messages={this.state.messages} 
        ref='messageList'
      />
      <AddMessage
        handleSubmit={this.handleSubmit.bind(this)} 
        inputValue={this.state.inputValue} 
        handleOnchange={this.handleOnchange.bind(this)}
      />
    </div>
  )}
}

export default App