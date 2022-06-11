import axios from "axios";

export const register= async(user)=>{
    try{
    let axios1 = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
      'name': user.name,
      'email': user.email,
      'password': user.password,
      'confirmPassword': user.confirmpassword
    });
    var config = {
      method: 'post',
      url: 'http://localhost:8000/api/register',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };
    
  const response = await axios1(config)
  if(response.data==="Registration completed.")
  return 1
  else
  return 0
}catch(error){
    console.log("dattha", error)
    return 0
}
    
}

export const login =(user)=>{


    return async (dispatch) => {
        try {
            dispatch({ type: "login_attempt" })
            const { data } = await axios.post('http://localhost:8000/api/login', user)
            if(data.status === "error") {
                return dispatch({type: "login_failed", payload : data.error})
            }
            dispatch({ type: "login_success", payload: data })
        } catch (error) {
            dispatch({ type: "login_failed", payload: error })
        }
    }
}

export const Logout =() => {
    return async(dispatch) => {
        try{ 
            const { data } = await axios.get('http://localhost:8000/api/logout');
            dispatch({ type: "logout_success"})
        }catch (error) {
            dispatch({ type: "logout failed", payload: error.response.data.message })
        }
    }
}

export const clearErrors =() =>{
    return async(dispatch) =>{
        dispatch({type:"clear_errors"})
    }
}