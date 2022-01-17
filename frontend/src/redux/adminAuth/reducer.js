import axios from "axios"

let initialState = {
    isAdmin: 'loading',
    type: 'user'
}


const adminAuthReducer = (state = initialState, action) => {
    if (action.type === "IS_ADMIN") {
        state = {
            ...state,
            isAdmin: true,
            type: action.payload.type
        }
        return state
    }
    else if (action.type === "IS_NOT_ADMIN") {
        state = {
            ...state,
            isAdmin: false,
        }
        return state
    }
    else {
        return state
    }
}

export default adminAuthReducer;