import React from 'react'


function Profile() {
    return (
        <>
            <section className="contact-style-two" style={{ backgroundImage: 'url(assets/images/background/contact-3.jpg)' }}>
                <div className="container-md">
                    <div className="col-xl-8 col-lg-12 col-md-12 inner-column">
                        <div className="sec-title left light">
                            
                            <h2>Create Profile</h2>
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
                                    <input type="text" name="service" placeholder="Service name" required />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                <input type="text" name="address" placeholder="Address" required />
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

export default Profile