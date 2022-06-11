import React from 'react'
import NavBar from './home/NavBar'

function Contact() {
  return (<>
      <NavBar />
  <section className="contact-style-two" style={{backgroundImage: 'url(assets/images/background/contact-3.jpg)'}}>
  <div className="auto-container">
    <div className="col-xl-8 col-lg-12 col-md-12 inner-column">
      <div className="sec-title left light">
        <h5>try our service</h5>
        <h2>Drop Us a Line</h2>
        <p>Ad mini veniam quis nostrud ipsum exercitas tion ullamco <br />ipsum laboris sed ut perspiciatis unde.</p>
      </div>
      <form method="post" action="sendemail.php" id="contact-form" className="default-form"> 
        <div className="row clearfix">
          <div className="col-lg-6 col-md-6 col-sm-12 form-group">
            <input type="text" name="username" placeholder="Your Name" required />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 form-group">
            <input type="email" name="email" placeholder="Email address" required />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 form-group">
            <input type="text" name="phone" placeholder="Phone" required />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 form-group">
            <input type="text" name="service" placeholder="service" required />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 form-group">
            <textarea name="address" placeholder="Address" defaultValue={""} />
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
            <button className="theme-btn style-one" type="submit" name="submit-form">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>
</>
  )
}

export default Contact