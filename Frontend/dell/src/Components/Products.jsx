import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../Redux/Product/action';
import { store } from '../Redux/store';

const Products = () => {
  const dispatch=useDispatch();
  const isAuth=useSelector((store)=>store.UserReducer.token);
  console.log(isAuth)
  useEffect(()=>{
    dispatch(getData(isAuth))
  },[])
  return (
    <div>Products</div>
  )
}

export default Products