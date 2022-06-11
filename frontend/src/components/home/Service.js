import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getservices } from '../../store/actions/serviceAction'


function Service() {
  const navigate= useNavigate();
  const [servicearray, setServicearray] = useState([])

  useEffect(() => {
    const updateservices = async () => {
      const data = await getservices()
      console.log({ data });
      setServicearray(data || [])
    }
    updateservices()
  }, [])


  return (
    <section className="feature-section sec-pad">
      <div className="auto-container">
        <div className="row clearfix">
          {
            servicearray.map(service => {
              return (<div className="col-lg-4 col-md-6 col-sm-12 feature-block">
                <div className="feature-block-one wow fadeInUp animated animated" data-wow-delay="00ms" data-wow-duration="1500ms">
                  <div className="inner-box">
                    <figure className="image-box"><img src="assets/images/resource/feature-1.jpg" alt="" /></figure>
                    <div className="lower-content">
                      <div className="inner">
                        <h3>{service.name}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)
            })
          }
         
        </div>
      </div>
    </section>

  )
}

export default Service