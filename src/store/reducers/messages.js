import { GET_MESSAGES_REQUEST,GET_MESSAGES_FAIL,GET_MESSAGES_SUCCESS } from "../actions/messages";
import { NEW_MESSAGE } from "../actions/socket";

const initialState = {
    messagesList:[],
}

export default function reducer(state = initialState, action){
    switch (action.type){
        case GET_MESSAGES_REQUEST: {
            return {
                ...state,
                messagesList: [],
                loading: true,
            }
        }
        case NEW_MESSAGE: {
            return {
                ...state,
                messagesList: [...state.messagesList, action.payload],
            }
        }
        case GET_MESSAGES_SUCCESS: {
            return {
                ...state,
                messagesList: action.payload,
                loading: false
            }
        }
        case GET_MESSAGES_FAIL: {
            return {
                ...state,
                messagesList: [],
                loading: false
            }
        }

        default:{
            return state;
        }
    }
}
