const messages = (state = [], action) => {
    switch (action.type) {
      case 'ADD_MESSAGE':
      case 'MESSAGE_RECEIVED':
        return state.concat([
          {
            message: action.message,
            sent: action.sent,
            meta: action.meta
          }
        ])
      default:
        return state
    }
  }
  
  export default messages