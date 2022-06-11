import React from 'react'
import { Link } from 'react-router-dom'

function Navbarsp() {
  return (
    <header className="main-header style-four">
    <div className="header-lower">
      <div className="auto-container">
        <div className="outer-box clearfix">
          
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
                      <li><Link to="/servicelist">Manage Services</Link></li>    
                                   
                      <li><Link to="/profile">profile</Link></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
    {/*sticky Header*/}
    <div className="sticky-header">
      <div className="auto-container">
        <div className="outer-box clearfix">
          <div className="logo-box pull-left">
            <figure className="logo"><a href="index.html"><img src="assets/images/small-logo-4.png" alt /></a></figure>
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

export default Navbarsp