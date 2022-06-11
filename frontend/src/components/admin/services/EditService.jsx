import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editservice, getOneService } from '../../../store/actions/serviceAction';
import Topbar from '../dashboard/Topbar';


function EditService() {
    const params = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");

    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const descHandler = (e) => {
        setDesc(e.target.value)
    }

    const priceHandler = (e) => {
        setPrice(e.target.value)
    }

    useEffect(() => {
        const { id } = params;
        const oneservice = async () => {
            const response = await getOneService(params.id)
            setDesc(response.description);
            setName(response.name);
            setPrice(response.price)
        }
        oneservice();
    }, [])

    const submitHandler = async (e) => {
        e.preventDefault();

        const service = {
            service_id: params.id,
            servicename: name,
            desc: desc,
            price: price
        }

        const responseData = await editservice(service)

        if (responseData)
            navigate('/servicelist');

    }

    return (
        <>
            <Topbar />
            <form className='container' onSubmit={submitHandler}>
                <div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">service name</label>
                        <input type="text" value={name} onChange={nameHandler} className="form-control" id="exampleFormControlInput1" placeholder="" />
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
                    <button type="submit" class="btn btn-primary">submit</button>
                </div>
            </form>
        </>
    )
}

export default EditService