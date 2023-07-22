import { useDispatch } from "react-redux";
import * as types from "./actionTypes";
import axios from "axios";

const getRequest=()=>{
    return {
        type:types.GET_REQUEST
    }
}

const getSuccess=(data)=>{
    return {
        type:types.GET_SUCCESS,
        payload:data
    }
}

const getError=()=>{
    return {
        type:types.GET_ERROR
    }
}

const getSortedRequest=()=>{
    return {
        type:types.GET_SORTED_REQUEST
    }
}

const getSortedSuccess=(data)=>{
    return {
        type:types.GET_SORTED_SUCCESS,
        payload:data
    }
}

const getSortedError=()=>{
    return {
        type:types.GET_SORTED_ERROR
    }
}

const generateArray=()=>(dispatch)=>{
    dispatch(getError())
    let arr=new Array(10);
    for(let i=0;i<arr.length;i++){
      let obj={
        id:(Math.floor(Math.random()*1000)+500),
        name:(Math.floor(Math.random() *-100) + 100)
      }
      arr[i]=obj
    }
    const tempData=[...arr];
    dispatch(getSuccess(arr))
    dispatch(sortedArray(tempData))
    // console.log(arr);
    // return arr
  }

  const setArray=(arr)=>(dispatch)=>{
    dispatch(getRequest())
    if(arr.length>0){
        dispatch(getSuccess(arr));
    }else{
        dispatch(getError());
    }
  }

  const sortedArray=(data)=>(dispatch)=>{
    // console.log(data)
    data.sort((a,b)=>a.name-b.name)
    // console.log(data)
    dispatch(getSortedRequest());
    if(data.length>0){
        dispatch(getSortedSuccess(data));
    }else{
        dispatch(getSortedError());
    }
  }



export {getError,getRequest,getSuccess,generateArray,setArray,sortedArray}