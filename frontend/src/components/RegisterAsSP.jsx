import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { clearErrors } from '../store/actions/serviceproviderAction'
import { registersp } from '../store/actions/serviceproviderAction'

function RegisterAsSP() {
    const { error } = useSelector((state) => {
        return state.auth;
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const nameHandler = (event) => {
        setName(event.target.value)
    }

    const emailHandler = (event) => {
        setEmail(event.target.value)
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }
    const confirmpasswordHandler = (event) => {
        setConfirmPassword(event.target.value)
    }

    const registerHandler = async (event) => {
        event.preventDefault();
        let sercice_provider = {
            name: name,
            email: email,
            password: password,
            confirmpassword: confirmpassword
        } 
    
    const responseData= await registersp(sercice_provider) 
    if (responseData)
    navigate('/profile');
}
    if (error) {
        setTimeout(() => {
            dispatch(clearErrors());
        }, 5000);
    }

    useEffect(() => {
        navigate('/registersp');
    }, [])
  

  return (
    <section className="support-section service-page-1">
    <div className="auto-container">
        <div className="inner-container">
            <div className="row clearfix">
                <div className="col-lg-8 col-md-6 col-sm-12 inner-column">
                    <div className="inner-box">
                        <div className="sec-title light left ">
                            <h2>Register Here as Service Provider</h2>
                        </div>
                        <form action="contact.html" onSubmit={registerHandler} method="post" className="submit-form">
                            <div className="form-group">
                                <input type="text" value={name} onChange={nameHandler} name="name" placeholder="Name" required />
                            </div>
                            <div className="form-group">
                                <input type="email" value={email} onChange={emailHandler} name="email" placeholder="Email address" required />
                            </div>
                            <div className="form-group">
                                <input type="password" value={password} onChange={passwordHandler} name="password" placeholder="Password" required />
                            </div>
                            <div className="form-group">
                                <input type="password" value={confirmpassword} onChange={confirmpasswordHandler} name="confirmpassword" placeholder="Confirm Password" required />
                            </div>
                            <div className="form-group message-btn">
                                <button type="submit" className="theme-btn style-one">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</section>

  )
}

export default RegisterAsSP