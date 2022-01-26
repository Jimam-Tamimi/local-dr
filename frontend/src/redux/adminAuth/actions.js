import axios from 'axios'


export const checkAdmin = () => async dispatch => {
    setTimeout( async () => {
        
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}api/account/is-admin/`)
            console.log(res)
            if (res.data.isAdmin) {
                dispatch({ type: "IS_ADMIN", payload: { type: res.data.type } })
            } else {
                dispatch({ type: "IS_NOT_ADMIN", payload: { type: res.data.type } })
            }
        } catch (error) {
            console.log(error.response);
            dispatch({ type: "IS_NOT_ADMIN", payload: { type: 'user' } })

        }
    }, );

}

