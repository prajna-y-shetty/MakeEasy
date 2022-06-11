import React from 'react'
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { deleteservice } from '../../../store/actions/serviceAction';



function Service_item({ service }) {
    const navigate = useNavigate();
   
const deleteHandler = async(event)=>{
    event.preventDefault()
    const response = await deleteservice(event.target.id)
    console.log({response, dps:event.target.id})
    if(response)
    navigate('/servicelist')
    else
    alert("delete unsuccessful")
}

    return (
        <tr>
            <td scope='row'>{service.id} </td>
            <td scope='row'>{service.name} </td>
            <td scope='row'>{service.description} </td>
            <td scope='row'>{service.price} </td>
            <td>
                <button type='button' style={{ backgroundColor: "yellow" }} onClick={() => {
                    navigate(`/admin/services/editservice/${service.id}`)
                }} className='btn btn-warning me-2'>EDIT</button>&nbsp;&nbsp;
                <button type='button' id={service.id}  style={{ backgroundColor: "red" }} onClick={deleteHandler} className='btn btn-warning me-2'>DELETE</button>
            </td>
        </tr>


    )
}

export default Service_item