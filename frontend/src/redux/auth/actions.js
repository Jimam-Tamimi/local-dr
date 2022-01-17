import axios from 'axios'
import { IoLogoFacebook } from 'react-icons/io5'
import alert from '../alert/actions'


export const signup = (email, password, cpassword) => async dispatch => {
    const data = { email, password, cpassword }
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/account/users/`, data, config)
        const payload = res.data
        if (payload.success) {
            dispatch(alert(`Account created successfully`, 'success'))
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: payload
            })
        }
    } catch (error) {
        if (error.response) {
            for (const err in error.response.data) {
                dispatch(alert(`${err}: ${(error.response.data[err]).indexOf('my user') !== -1? (error.response.data[err]).replace('my user', 'user'): (error.response.data[err])}`, 'danger'))
            }
        }
    }

}


export const login = (email, password) => async dispatch => {
    const data = { email, password }
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/account/token/`, data, config)
        const payload = res.data 
        dispatch(alert(`Login successful`, 'success'))
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: payload
        }) 
        return true
    } catch (error) {
        if (error.response) {
            for (const err in error.response.data) {
                dispatch(alert(`${err}: ${error.response.data[err]}`, 'danger'))
            }
        }
    }
}
 
export const authenticate = () => async dispatch => {
    const auth = JSON.parse(localStorage.getItem('auth'))
    if(auth?.isAuthenticated) {
        let data = { token: auth.access }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            const res = await axios.post(`${process.env.REACT_APP_API_URL}api/account/token/verify/`, data, config)

        } catch (error) {
        }
    }
}

export const refreshToken = () => async dispatch => {
    const auth = JSON.parse(localStorage.getItem('auth'))
    if(auth?.refresh) {
        let data = { refresh: auth.refresh }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            const res = await axios.post(`${process.env.REACT_APP_API_URL}api/account/token/refresh/`, data, config)
            if(res.status === 200){

                dispatch({
                    type: 'REFRESH_TOKEN_SUCCESS',
                    payload: res.data
                })
            }
        } catch (error) {
            if (error?.response?.status === 401) {
                dispatch({type: 'LOGOUT'})
            }
        }
    }
}
export const logout = () => async dispatch => {
    dispatch({type: 'LOGOUT'}) 
    dispatch(alert(`Logout successful`, 'success'))

}
