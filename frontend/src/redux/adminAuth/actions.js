import axios from 'axios'


export const checkAdmin = () => async dispatch => {

    try {
        const { access, refresh } = JSON.parse(localStorage.getItem('auth'))
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`
            }
        }
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/account/is-admin/`, {}, config)
        if (res.data.isAdmin) {
            dispatch({ type: "IS_ADMIN" })
        } else {
            dispatch({ type: "IS_NOT_ADMIN" })
        }
    } catch (error) {
        dispatch({ type: "IS_NOT_ADMIN" })

    }

}

