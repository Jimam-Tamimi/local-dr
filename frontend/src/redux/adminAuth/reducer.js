import axios from "axios"

let initialState = {
    isAdmin: 'loading'
}


const adminAuthReducer = (state = initialState, action) => {
    if (action.type === "IS_ADMIN") {
        state = {
            ...state,
            isAdmin: true,
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