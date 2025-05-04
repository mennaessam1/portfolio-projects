import { contactData } from '@/data/contact-data';
import Link from 'next/link';
import React from 'react';

const ContactAddressArea = () => {
    return (
        <>
            <section className="bd-about-us-area section-space">
                <div className="container">
                    <div className="row gy-24">
                        {
                            contactData && contactData.map(item => <div key={item.id} className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
                                <div className="contact-box">
                                    <div className="contact-icon mb-30"><i className="icon-call-ring"></i></div>
                                    <h5 className="contact-title mb-15">{item.title}</h5>
                                    <div className="contact-content">
                                        <Link href="tel:+415864872899">{item.subTitleOne}</Link>
                                        <Link href="tel:+415864872997">{item.subTitleTwo}</Link>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </section>
        </>
    );
};

export default ContactAddressArea;