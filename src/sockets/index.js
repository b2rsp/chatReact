import * as types from '../constants/ActionTypes'
import { messageReceived} from '../actions'
import socketIOClient from "socket.io-client";

const setupSocket = (dispatch, username) => {
    const socket = socketIOClient('http://localhost:8089');
    socket.emit(types.ADD_MESSAGE, 'test')
    socket.on(types.ADD_MESSAGE, function(msg){
        console.log('messageReceiveed ', msg)
        dispatch(messageReceived('something', true))
    });
    return socket
}

export default setupSocket