import {combineReducers} from 'redux'
import authReducer from './auth/reducer'
import alertReducer from './alert/reducer'
import adminAuthReducer from './adminAuth/reducer'
const rootReducer = combineReducers({
    auth: authReducer,
    adminAuth: adminAuthReducer,
    alerts: alertReducer,
})

export default rootReducer