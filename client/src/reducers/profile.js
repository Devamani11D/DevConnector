import { CLEAR_PROFILE, GET_PROFILE,PROFILE_ERR, UPDATE_PROFILE } from "../actions/types";

const initialState={
    profile:null,
    profiles:[],
    loading:true,
    repos:[],
    error:{}
};

export default function(state=initialState,action){
    const {type,payload}=action;

    switch(type){
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile:payload,
                loading:false
            };
        case PROFILE_ERR:
            return {
                ...state,
                profile:null,
                loading:false
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                profile:null,
                loading:false
            }
        default:
            return state;
    }
}