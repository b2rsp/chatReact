import * as types from '../constants/ActionTypes'

let nextMessageId = 0
const nextUserId = 0

export const addMessage = (message, sent) => ({
  type: types.ADD_MESSAGE,
  id: nextMessageId++,
  message,
  sent,
  meta: {}
})

export const messageReceived = (message, sent) => ({
  type: types.MESSAGE_RECEIVED,
  id: nextMessageId++,
  message,
  sent,
  meta: {}
})
