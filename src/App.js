
import React from 'react'
import './App.css'
import MessagesList from './components/MessagesList'
import AddMessage from './components/AddMessage';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.setState({
      messages: []
    })
  }
  state = {
    messages: []
  }
  
  handleSubmit (e){
    e.preventDefault()
    let messages = this.state.messages
    messages.push({
      id: 3,
      message: 'daa',
      sent: true,
      meta: {}
    }) 
    this.setState({
      messages
      })
  }
  componentDidMount() {
    // this set state from ajax calls or localstorage
    this.setState({
      messages: [,
    {
      id: 2,
      message: 'zzzz',
      sent: true,
      meta: {}
    }]
    })
  }
  render() {
  return (<div id="container">
    <section id="main">
      <MessagesList messages={this.state.messages}/>
      <AddMessage handleSubmit={this.handleSubmit.bind(this)}/>
    </section>
  </div>
  )}
}
export default App