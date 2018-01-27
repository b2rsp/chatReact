import { combineReducers } from 'redux'
import messages from './messages'

const chat = combineReducers({
  messages
})

export default chat
