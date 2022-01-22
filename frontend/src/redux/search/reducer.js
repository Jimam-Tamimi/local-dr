let initialState = {
    doctor: '',
    lat: '',
    lng: '',
    available: '',
    distance: 30,
    speciality: '',
    location_name: '',

} 


const searchReducer = (state=initialState, action) => {
    if(action.type === "CHANGE_DOCTOR") {
        state = {
            ...state,
            doctor: action.payload
        }
        return state
    } else if(action.type === "CHANGE_LAT"){
        state = {
            ...state,
            lat: action.payload
        }
        return state
    }
    else if(action.type === "CHANGE_LNG"){
        state = {
            ...state,
            lng: action.payload
        }
        return state
    }
    else if(action.type === "CHANGE_AVAILABLE"){
        state = {
            ...state,
            available: action.payload
        }
        return state
    } else if(action.type === "CHANGE_DISTANCE"){
        state = {
            ...state,
            distance: action.payload
        }
        return state
    }
    else if(action.type === "CHANGE_SPECIALITY"){
        state = {
            ...state,
            speciality: action.payload
        }
        return state
    }
    else if(action.type === "CHANGE_LOCATION_NAME"){
        state = {
            ...state,
            location_name: action.payload
        }
        return state
    }
    else {
        return state
    }
}

export default searchReducer;