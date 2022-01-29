import jwt_decode from "jwt-decode";

const auth = JSON.parse(localStorage.getItem('auth'))
let initialState = {}
if(auth){ 
    initialState = {
        access: auth?.access || null,
        refresh: auth?.refresh || null,
        isAuthenticated: auth?.isAuthenticated || false, 
        id: auth?.id || null,
    } 
} else {
    initialState = {
        access: auth?.access || null,
        refresh: auth?.refresh || null,
        isAuthenticated: auth?.isAuthenticated || false, 
        id: auth?.id || null,

    }
} 


const authReducer = (state=initialState, action) => {
    if(action.type === "LOGIN_SUCCESS") {
        const { access, refresh } = action.payload
        console.log(action.payload);
         
        var token = access;
        var decoded = jwt_decode(token);
        let user_id = decoded.user_id; 
        state = {
            ...state,
            access: access,
            refresh: refresh,
            isAuthenticated: true, 
            id: user_id ,

        }
        localStorage.setItem('auth', JSON.stringify(state))
        return state
    }
    else if (action.type === "LOGOUT") { 
        state = {
            ...state,
            access: null,
            refresh: null,
            isAuthenticated: false, 
            id: null ,

        }
        localStorage.setItem('auth', JSON.stringify(state))
        return state
    }
    else if (action.type === "REFRESH_TOKEN_SUCCESS") { 
        const payload = action.payload
                 
        let user_id = decoded.user_id; 
        state = {
            ...state,
            access: payload.access,
            refresh: payload.refresh,
            isAuthenticated: true, 
            id: user_id ,
        }
        localStorage.setItem('auth', JSON.stringify(state))
        return state
    }
    else {
        return state
    }
}

export default authReducer;