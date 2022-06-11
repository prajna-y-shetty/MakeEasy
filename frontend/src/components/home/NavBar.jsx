import React from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import { Logout} from '../../store/actions/authActions'

function NavBar() {
  const { isAuth } = useSelector((state)=> state.auth)
  const dispatch = useDispatch();
  const logout =() =>{
    dispatch(Logout());
  }
  return (
    <header className="main-header style-one style-three">
    <div className="header-lower">
      <div className="outer-box">
        <div className="auto-container">
          <div className="main-box clearfix">
            <div className="logo-box pull-left">
              <figure className="logo"><a href="index.html"><img src="assets/images/logo-3.png" alt=""/></a></figure>
            </div>
            <div className="menu-area pull-right clearfix">
              {/*Mobile Navigation Toggler*/}
              <div className="mobile-nav-toggler">
                <i className="icon-bar" />
                <i className="icon-bar" />
                <i className="icon-bar" />
              </div>
              <nav className="main-menu navbar-expand-md navbar-light">
                <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                  <ul className="navigation clearfix">
                    <li className="current dropdown"><a href="index-3.html">Home</a>
                      <ul>
                        <li><a href="index.html">Home Page One</a></li>
                        <li className="dropdown"><a href="index-3.html">Header Style</a>
                        </li>
                      </ul>
                    </li>        
                                           
                    <li><Link to="/contact">Contact</Link></li>
                   
                    {isAuth ?  (<li><a href=''onClick={logout}>Logout</a> </li>) : (<li><Link to="/login">Login</Link></li>)}
            
                  </ul>
                </div>
              </nav>
              <div className="menu-right-content clearfix">
                <div className="search-btn">
                  <button type="button" className="search-toggler"><i className="flaticon-search-1" /></button>
                </div>
                <div className="nav-btn nav-toggler navSidebar-button clearfix">
                  <i className="fas fa-align-right" />
                </div>
                <div className="support-box">
                  <i className="flaticon-smartphone-1" />
                  <p>Call us for help today!</p>
                  <h3><a href="tel:01005200369">0100 5200 369</a></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/*sticky Header*/}
    <div className="sticky-header">
      <div className="auto-container">
        <div className="outer-box clearfix">
          <div className="logo-box pull-left">
            <figure className="logo"><a href="index.html"><img src="assets/images/small-logo-3.png" alt=""/></a></figure>
          </div>
          <div className="menu-area pull-right">
            <nav className="main-menu clearfix">
              {/*Keep This Empty / Menu will come through Javascript*/}
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}

export default NavBar