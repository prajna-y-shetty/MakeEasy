import axios from "axios";

export const registersp=async(service_provider)=>{
    var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
  'name': service_provider.name,
  'email': service_provider.email,
  'password': service_provider.password,
  'confirmPassword': service_provider.confirmpassword
});
var config = {
  method: 'post',
  url: 'http://localhost:8000/api/service_provider/registersp',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

const response =await axios(config)
if(response.data==="Registration completed.")
return 1
else
return 0
}

export const clearErrors =() =>{
    return async(dispatch) =>{
        dispatch({type:"clear_errors"})
    }
}