import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { login, clearErrors } from '../store/actions/authActions'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, } from 'react-router-dom';



function Login() {
  const { user, isAuth, loading, error } = useSelector((state) => {
    return state.auth;
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (event) => {
    setEmail(event.target.value)
  }
  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    let user = {
      email: email,
      password: password
    }
    dispatch(login(user));
  }
  if (error) {
    setTimeout(() => {
      dispatch(clearErrors());
    }, 5000);
  }

  useEffect(() => {
    if (isAuth === true) {
      navigate('/');
    }
  }, [isAuth])



  return (
    <>
      {error ?
        (<div className="alert alert-danger" role="alert">
          {error}
        </div>) : ""
      }

      {loading === true ? (
        <div className='d-flex justify-content-center align-content-center'>
          <img src="assets/loader.gif" alt="" /> </div>
      ) : (<section className="support-section service-page-1">
        <div className="auto-container">
          <div className="inner-container">
            <div className="row clearfix">
              <div className="col-lg-6 col-md-6 col-sm-12 info-column">
                <div className="inner-box">
                  <div className="sec-title light left">
                    <h2>Login</h2>
                  </div>
                  <form action="contact.html" onSubmit={submitHandler} method="post" className="submit-form">

                    <div className="form-group">
                      <input type="email" value={email} onChange={emailHandler} name="email" placeholder="Email address" required />
                    </div>
                    <div className="form-group">
                      <input type="password" value={password} onChange={passwordHandler} name="password" placeholder="Password" required />
                    </div>
                    <div className="form-group message-btn">
                      <button type="submit" className="theme-btn style-one">Login</button>&nbsp;&nbsp;
                      <button type="submit" className="theme-btn style-one" onClick={() => { navigate(`/register`) }}>Register</button>&nbsp;&nbsp;
                      <button type="submit" className="theme-btn style-one" onClick={() => { navigate(`/registersp`) }}>Register as Service Provider</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>)
      }

    </>)
}

export default Login