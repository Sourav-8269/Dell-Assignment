import * as types from "./actionTypes";
import axios from "axios";

const getRequest=()=>{
    return {
        type:types.GET_REQUEST
    }
}

const getSuccess=(token)=>{
    return {
        type:types.GET_SUCCESS,
        payload:token
    }
}

const getError=()=>{
    return {
        type:types.GET_ERROR
    }
}

const getData=(token)=>(dispatch)=>{
    dispatch(getRequest())
    axios.get(`https://important-panama-hat-mite.cyclic.app/products`,{headers: {
        'Authorization': `${token}` 
      }})
    .then((res)=>{
        dispatch(getSuccess(res.data))
    })
    .catch((err)=>dispatch(getError()))
}

const getSingleData=(token,id)=>(dispatch)=>{
    dispatch(getRequest())
    axios.get(`https://important-panama-hat-mite.cyclic.app/products/single/${id}`,{headers: {
        'Authorization': `${token}` 
      }})
    .then((res)=>{
        dispatch(getSuccess(res.data))
    })
    .catch((err)=>dispatch(getError()))
}
  
    const searchData=(token,search)=>(dispatch)=>{
      return axios.get(`https://important-panama-hat-mite.cyclic.app/products/search?q=${search}`,{headers: {
        'Authorization': `${token}` 
      }})
        .then((res)=>{
            dispatch(getSuccess(res.data))
        })
        .catch((err)=>console.log(err));
    }


export {getError,getRequest,getSuccess,getData,searchData,getSingleData}