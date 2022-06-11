import React from 'react'

function Footer() {
  return (
  <footer className="main-footer alternet-3">
  <div className="footer-upper">
    <div className="auto-container">
      <div className="upper-inner clearfix">
        <div className="text pull-left">
          <h2>Do you want to learn about us?</h2>
          <p>Consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore magna aliqua.</p>
        </div>
        <div className="btn-box pull-right">
          <a href="index-3.html">Take a Free Demo</a>
        </div>
      </div>
    </div>
  </div>
  <div className="footer-top">
    <div className="auto-container">
      <div className="widget-section">
        <div className="row clearfix">
          <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
            <div className="footer-widget logo-widget">
              <figure className="footer-logo"><a href="index.html"><img src="assets/images/footer-logo-3.png" alt=""/></a></figure>
              <div className="text">
                <p>Tempor incididunt ut labore eut dolore veniam quis nostrud exercitation ullamc consequat. Duis aute irure.</p>
              </div>
              <ul className="info-list clearfix">
                <li><i className="fas fa-map-marker-alt" />838 Andy Street, Madison, NJ 08003</li>
                <li><i className="fas fa-envelope" />Email <a href="mailto:support@my-domain.com">support@my-domain.com</a></li>
                <li><i className="fas fa-headphones" />Support <a href="tel:01005200369">0100 5200 369</a></li>
              </ul>
              <ul className="social-links clearfix">
                <li><a href="index.html"><i className="fab fa-twitter" /></a></li>
                <li><a href="index.html"><i className="fab fa-facebook-f" /></a></li>
                <li><a href="index.html"><i className="fab fa-instagram" /></a></li>
                <li><a href="index.html"><i className="fab fa-linkedin-in" /></a></li>
                <li><a href="index.html"><i className="fab fa-pinterest-p" /></a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
            <div className="footer-widget links-widget ml-70">
              <div className="widget-title">
                <h4>Useful Links</h4>
              </div>
              <div className="widget-content">
                <ul className="list clearfix">
                  <li><a href="index.html">About Us</a></li>
                  <li><a href="index.html">What We Offers</a></li>
                  <li><a href="index.html">Testimonials</a></li>
                  <li><a href="index.html">Our Projectss</a></li>
                  <li><a href="index.html">Latest News</a></li>
                  <li><a href="index.html">Privacy Policy</a></li>
                  <li><a href="index.html">Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
            <div className="footer-widget links-widget">
              <div className="widget-title">
                <h4>What We Do</h4>
              </div>
              <div className="widget-content">
                <ul className="list clearfix">
                  <li><a href="index.html">Financial Advice</a></li>
                  <li><a href="index.html">Business Planning</a></li>
                  <li><a href="index.html">Startup Help</a></li>
                  <li><a href="index.html">Investment Strategy</a></li>
                  <li><a href="index.html">Management Services</a></li>
                  <li><a href="index.html">Market Research</a></li>
                  <li><a href="index.html">SEO Optimization</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
            <div className="footer-widget newsletter-widget">
              <div className="widget-title">
                <h4>Newslette</h4>
              </div>
              <div className="widget-content">
                <div className="text">
                  <p>Get in your inbox the latest News</p>
                </div>
                <form action="contact.html" method="post" className="newsletter-form">
                  <div className="form-group">
                    <i className="far fa-user" />
                    <input type="text" name="name" placeholder="Your Name" required />
                  </div>
                  <div className="form-group">
                    <i className="far fa-envelope" />
                    <input type="email" name="email" placeholder="Email address" required />
                  </div>
                  <div className="form-group message-btn">
                    <button className="theme-btn style-three" type="submit">subscribe</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="footer-bottom">
    <div className="auto-container">
      <div className="copyright"><p>© 2020 <a href="index.html">FIONCA</a> - Business &amp; Consulting. All rights reserved.</p></div>
    </div>
  </div>
</footer>

  )
}

export default Footer