import axios from 'axios'


export const checkAdmin = () => async dispatch => {

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}api/account/is-admin/`)
        console.log(res)
        if (res.data.isAdmin) {
            dispatch({ type: "IS_ADMIN" })
        } else {
            dispatch({ type: "IS_NOT_ADMIN" })
        }
    } catch (error) {
        dispatch({ type: "IS_NOT_ADMIN" })

    }

}

