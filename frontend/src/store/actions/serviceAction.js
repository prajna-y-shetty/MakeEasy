import axios from "axios";

const baseURL = "http://localhost:8000/api/service";

export const getservices = async () => {

    try {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://localhost:8000/api/service/getservices',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        return (await axios(config)).data

    } catch (error) {
        // dispatch({ type: "getservices failed", payload: error.response.data.message })
        console.log("get service error==============================>", error)
        return []
    }
}

export const addService = async (serviceName, descName, price) => {
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
        'servicename': serviceName,
        'desc': descName,
        'price': price

    });
    var config = {
        method: 'post',
        url: 'http://localhost:8000/api/service/addservice',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    const responseMessage = (await axios(config)).data;
    if (responseMessage === "success")
        return 1;
    else return 0

}

export const listservice = async () => {
    try {
        var axios = require('axios');
        var qs = require('qs');
        var config = {
            method: 'get',
            url: 'http://localhost:8000/api/service/listservice',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const response = await axios(config)
        if (response.data.status === "success") {
            return response.data.services
        } else
            return []
    }
    catch (error) {
        console.log("error in get list of services", error);
        return []
    }

}

export const editservice = async (service) => {
    let axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
        'servicename': service.servicename,
        'desc': service.desc,
        'price': service.price,
        'service_id': service.service_id
    });
    var config = {
        method: 'post',
        url: 'http://localhost:8000/api/service/editservice',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    const response = await axios(config)
    return response.data.service;

}

export const deleteservice = async(id) => {
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
        'service_id': id
    });
    var config = {
        method: 'delete',
        url: 'http://localhost:8000/api/service/deleteservice',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
    };

    const response = await axios(config)
    if(response.data.status==="success"){
        return true
    }else{
        return false
    }

        

}

export const getOneService = async (id) => {
    try {
        let axios = require('axios');
        let qs = require('qs');
        let config = {
            method: 'get',
            url: 'http://localhost:8000/api/service/oneservice/' + id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const response = await axios(config);
        return response.data.service;

    }
    catch (error) {
        console.log("error in getting one service", error);
        return 0;
    }
}