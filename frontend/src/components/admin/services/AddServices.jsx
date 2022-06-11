import React, { useState } from 'react'
import Topbar from '../dashboard/Topbar';
const { addService } = require("../../../store/actions/serviceAction")


function AddServices() {
    const [servicename, setServicename] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");

    const nameHandler = (e) => {
        setServicename(e.target.value);
    }
    const descHandler = (e) => {
        setDesc(e.target.value);
    }
    const priceHandler = (e) =>{
        setPrice(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const response = await addService(servicename, desc, price)
    
    if (response) alert("service added successfully")
        else alert("Failed to add service")
    }

    return (
        <>
        <Topbar />
        <form className='container' onSubmit={submitHandler}>
            <div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">service name</label>
                    <input type="text" value={servicename} onChange={nameHandler} className="form-control" id="exampleFormControlInput1" placeholder="" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">service desacription</label>
                    <textarea className="form-control" value={desc} onChange={descHandler} id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">price</label>
                    <textarea className="form-control" value={price} onChange={priceHandler} id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                </div>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="submit" class="btn btn-primary">ADD</button>
            </div>
        </form>
        </>
    )
}

export default AddServices