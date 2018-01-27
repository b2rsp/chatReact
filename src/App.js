
import React from 'react'
import './App.css'
import { MessagesList } from './containers/MessagesList'
import { AddMessage } from './containers/ AddMessage';

const App = () => (
  <div id="container">
    <section id="main">
      <MessagesList />
      <AddMessage />
    </section>
  </div>
)
export default App