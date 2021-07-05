import socket from "socket.io-client";
import Api from '../../Api';

let io;

export const SOCKET_ACTIVE_USERS = "SOCKET_ACTIVE_USERS";
export const NEW_MESSAGE = "NEW_MESSAGE";

export function socketInit(token){
    return(dispatch) => {
        if (io){
            return;
        }
        io = socket(Api.url, {
            extraHeaders : {Authorization: `Bearer ${token}` },
        });
        io.on('active-users', users => {
            dispatch({
                type: SOCKET_ACTIVE_USERS,
                payload: { users },
            })
        });
        io.on('new-mesage', data => {
            dispatch({
                type: NEW_MESSAGE,
                payload: data,
            })
        })
    }
}

export function sendMessage(data){
    io.emit('send-message', data)
    return {
        type: "SEND_MESSAGE",
        payload: { data },
    }
}
