import {combineReducers} from 'redux'
import authReducer from './auth/reducer'
import alertReducer from './alert/reducer'
import adminAuthReducer from './adminAuth/reducer'
import searchReducer from './search/reducer'
import progressReducer from './progress/reducer'
const rootReducer = combineReducers({
    auth: authReducer,
    adminAuth: adminAuthReducer,
    alerts: alertReducer,
    search: searchReducer,
    progress: progressReducer,
})

export default rootReducer