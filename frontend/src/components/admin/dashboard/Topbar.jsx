import React from 'react'
import { Link } from 'react-router-dom'
// import { Logout } from '../../../store/actions/authActions'
// import { useDispatch } from 'react-redux'


function Topbar() {

  return (
    <header className="main-header style-four ">
      <div className="header-lower">
        <div class="p-3 mb-2 bg-info text-dark">
          <div className="auto-container">
            <div className="outer-box clearfix">
              <div className="menu-area pull-right clearfix">
                <nav className="main-menu navbar-expand-md navbar-light">
                  <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                    <ul className="navigation clearfix" >
                      <li><Link to="/servicelist">Manage Services</Link></li>

                      <li><Link to="">profile</Link></li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

  )
}

export default Topbar