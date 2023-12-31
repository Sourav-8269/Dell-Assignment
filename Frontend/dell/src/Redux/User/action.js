import * as types from "./actionTypes";
import axios from "axios";

const registerRequest=()=>{
    return {
        type:types.REGISTER_REQUEST
    }
}

const registerSuccess=()=>{
    return {
        type:types.REGISTER_SUCCESS
    }
}

const registerError=()=>{
    return {
        type:types.REGISTER_ERROR
    }
}

const loginRequest=()=>{
    return {
        type:types.LOGIN_REQUEST
    }
}

const loginSuccess=(token)=>{
    return {
        type:types.LOGIN_SUCCESS,
        payload:token
    }
}

const loginError=()=>{
    return {
        type:types.LOGIN_ERROR
    }
}

// Get Data form backend

const userRegister=(payload)=>(dispatch)=>{
    dispatch(registerRequest())
    return axios.post(`https://important-panama-hat-mite.cyclic.app/users/register`,payload)
    .then((res)=>{
        dispatch(registerSuccess())
        return true;
    })
    .catch((err)=>dispatch(registerError()))
}

// Adding Data 

const userLogin=(payload)=>(dispatch)=>{
    dispatch(loginRequest())
    return axios.post(`https://important-panama-hat-mite.cyclic.app/users/login`,payload)
    .then((res)=>{
        if(res.data.msg){
            localStorage.setItem("dellUser",JSON.stringify(res.data.token))
            dispatch(loginSuccess(res.data.token))
            return true;
        }else{
            return false;
        }
    })
    .catch((err)=>dispatch(loginError()))
}

export {userRegister,userLogin}