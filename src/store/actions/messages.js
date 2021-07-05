export const GET_MESSAGES_REQUEST = "GET_MESSAGES_REQUEST";
export const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS";
export const GET_MESSAGES_FAIL = "GET_MESSAGES_FAIL";

export function getMessages(groupId){
    return{
        type: GET_MESSAGES_REQUEST,
        payload: { groupId },
    }
}
