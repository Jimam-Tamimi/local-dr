const auth = JSON.parse(localStorage.getItem('auth'))
let initialState = {}
if(auth){ 
    initialState = {
        access: auth?.access || null,
        refresh: auth?.refresh || null,
        isAuthenticated: auth?.isAuthenticated || false, 
    } 
} else {
    initialState = {
        access: auth?.access || null,
        refresh: auth?.refresh || null,
        isAuthenticated: auth?.isAuthenticated || false, 
    }
} 


const authReducer = (state=initialState, action) => {
    if(action.type === "LOGIN_SUCCESS") {
        const { access, refresh } = action.payload
        state = {
            ...state,
            access: access,
            refresh: refresh,
            isAuthenticated: true, 
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
        }
        localStorage.setItem('auth', JSON.stringify(state))
        return state
    }
    else if (action.type === "REFRESH_TOKEN_SUCCESS") { 
        const payload = action.payload
        state = {
            ...state,
            access: payload.access,
            refresh: payload.refresh,
            isAuthenticated: true, 
        }
        localStorage.setItem('auth', JSON.stringify(state))
        return state
    }
    else {
        return state
    }
}

export default authReducer;