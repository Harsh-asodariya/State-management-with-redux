import * as actionTypes from './actionTypes';
import dataId from '../IdGenerator/dataId';

const initialState = {
    singleData: {
        name: '',
        email: '',
        phone: '',
        address: '',
        website:'',
        id: ''
    },
    data: [],
    slider: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_DETAIL_HANDLER:
            return {
                ...state,
                singleData: {
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    website:'',
                    id: ''
                },
                slider: true
            }
        case actionTypes.DRAWER_CLOSE:
            return {
                ...state,
                slider: false
            }
        case actionTypes.ONCHANGE_HANDLER:
            let field = action.event.target.id
            let singleDataCopy = {
                ...state.singleData
            }
            singleDataCopy[field] = action.event.target.value
            return {
                ...state,
                singleData: singleDataCopy
            }
        case actionTypes.SUBMIT_DETAIL_HANDLER:
            let data
            if (action.id) {
                data = [...state.data]
                for (let singledata in data) {
                    let dataId = data[singledata].id
                    if (dataId === action.id) {
                        data[singledata] = state.singleData
                        break;
                    }
                }
            }
            else {
                let updatedData = {
                    ...state.singleData,
                    id: dataId()
                }
                data = state.data.concat(updatedData)
            }
            let updatedSingleData = {
                name: '',
                email: '',
                phone: '',
                address: '',
                website:'',
                id: ''
            }
            return {
                ...state,
                slider: false,
                data: data,
                singledata: updatedSingleData
            }
        case actionTypes.DELETE_EVENT_HANDLER:
            let access = window.confirm('Are you sure');
            if (access) {
                let tempdata = [...state.data]
                for (let data in tempdata) {
                    let dataId = tempdata[data].id
                    if (dataId === action.id) {
                        tempdata.splice(data, 1)
                        break;
                    }
                }
                return {
                    ...state,
                    data: tempdata
                }
            }
            else{
                return{
                    ...state,
                }
            }
        case actionTypes.EDIT_EVENT_HANDLER:
            let tempdata = [...state.data]
            let tempSingleData
            for (let singledata in tempdata) {
                let dataId = tempdata[singledata].id
                if (dataId === action.id) {
                    tempSingleData = tempdata[singledata]
                    break;
                }
            }
            return {
                ...state,
                singleData:tempSingleData,
                slider:true
            }

        default:
            return state
    }
}

export default reducer;