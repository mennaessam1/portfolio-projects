import React from 'react';

const ContactMapArea = () => {
    return (
        <>
            <div className="bd-map-area section-space-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="google-map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204504.41849189487!2d-120.10638011282221!3d36.78540155444695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80945de1549e4e9d%3A0x7b12406449a3b811!2sFresno%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1707738286385!5m2!1sen!2sbd" height="500" style={{border: '0'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactMapArea;