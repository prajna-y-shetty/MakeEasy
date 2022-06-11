import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom'
import Topbar from '../dashboard/Topbar';
import Service_item from './Service_item';
import { listservice } from '../../../store/actions/serviceAction';


function ServiceList() {
  const navigate = useNavigate();
  const [services, setServices] = useState([])

  useEffect(() => {
    const apiForListService = async () => {
      setServices(await listservice());
    }
    apiForListService();
  }, [services]);
  return (
    <>
      <Topbar />
      <section className="intro-section">
        <div className="auto-container">
          <button className='btn btn-primary btn-lg' onClick={() => { navigate('/addservices'); }} style={{ backgroundColor: "green" }}>
            <i className="fa fa-check" aria-hidden="true"></i>ADD</button>&nbsp; &nbsp;
          <hr />
          <h4>Service List</h4>
          <div className="row clearfix">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Service Name</th>
                  <th scope="col">Service Description</th>
                  <th scope="col">Service Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {services && services.map((service) => {
                  return (
                    <Service_item key={service.id} service={service} />
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

export default ServiceList