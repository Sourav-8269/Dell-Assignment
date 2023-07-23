import { useDispatch, useSelector } from "react-redux";
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
    axios.get(`http://localhost:8080/products`,{headers: {
        'Authorization': `${token}` 
      }})
    .then((res)=>{
        console.log(res.data)
        dispatch(getSuccess(res.data))
    })
    .catch((err)=>dispatch(getError()))
}

const getSingleData=(token,id)=>(dispatch)=>{
    dispatch(getRequest())
    axios.get(`http://localhost:8080/products/single/${id}`,{headers: {
        'Authorization': `${token}` 
      }})
    .then((res)=>{
        console.log(res.data)
        dispatch(getSuccess(res.data))
    })
    .catch((err)=>dispatch(getError()))
}

const filterData=(category)=>(dispatch)=>{
    console.log(category)
      axios.get(`https://dark-ruby-angler.cyclic.app/jobs?location=${category}`)
      .then((res)=>{
          console.log(res)
          dispatch(getSuccess(res.data))
      })
      .catch((err)=>console.log(err));
  }

  const filtercontrat=(category)=>(dispatch)=>{
    console.log(category)
      axios.get(`https://dark-ruby-angler.cyclic.app/jobs?contract=${category}`)
      .then((res)=>{
          console.log(res)
          dispatch(getSuccess(res.data))
      })
      .catch((err)=>console.log(err));
  }
  
    const searchData=(token,search)=>(dispatch)=>{
      console.log(search)
      return axios.get(`http://localhost:8080/products/search?q=${search}`,{headers: {
        'Authorization': `${token}` 
      }})
        .then((res)=>{
            console.log(res)
            dispatch(getSuccess(res.data))
        })
        .catch((err)=>console.log(err));
    }


export {getError,getRequest,getSuccess,getData,searchData,filterData,filtercontrat,getSingleData}