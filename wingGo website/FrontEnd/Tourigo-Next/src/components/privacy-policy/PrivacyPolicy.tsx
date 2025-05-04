import Link from 'next/link';
import React from 'react';

const PrivacyPolicy = () => {
    return (
        <>
            <section className="policy-area section-space">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="policy-wrapper p-relative z-index-1">
                                <div className="policy-item">
                                    <h4 className="policy-title">Introduction</h4>
                                    <p>Thank you for visiting Tourigo. This Privacy Policy outlines how we collect, use, disclose,
                                        and manage your personal information. By using our website, you agree to the terms of this
                                        Privacy Policy.</p>
                                </div>

                                <div className="policy-item">
                                    <h4 className="policy-title">Information We Collect</h4>
                                    <p>We collect personal information that you voluntarily provide to us when you use our website,
                                        including but not limited to your name, email address, phone number, and payment information.
                                    </p>
                                </div>

                                <div className="policy-item">
                                    <h4 className="policy-title">How We Use Your Information</h4>
                                    <p className="mb-10">We may use your personal information to:</p>
                                    <ul>
                                        <li>Provide and personalize our services</li>
                                        <li>Communicate with you about your bookings or inquiries</li>
                                        <li>Improve our website and services</li>
                                        <li>Process payments</li>
                                        <li>Comply with legal obligations</li>
                                    </ul>
                                </div>

                                <div className="policy-item">
                                    <h4 className="policy-title">How We Share Your Information</h4>
                                    <p>We do not sell, trade, or otherwise transfer your personal information to third parties
                                        without your consent, except as described in this Privacy Policy or as required by law.</p>
                                </div>

                                <div className="policy-item">
                                    <h4 className="policy-title">Cookies and Tracking Technologies</h4>
                                    <p>We use cookies and similar tracking technologies to analyze trends, administer our website,
                                        track users’ movements around the site, and gather demographic information about our user
                                        base.</p>
                                </div>

                                <div className="policy-item">
                                    <h4 className="policy-title">Third-Party Links</h4>
                                    <p>Our website may contain links to third-party websites. We have no control over the content or
                                        privacy practices of these sites and are not responsible for their content or privacy
                                        policies.</p>
                                </div>

                                <div className="policy-item">
                                    <h4 className="policy-title">Security</h4>
                                    <p>We take reasonable measures to protect your personal information from unauthorized access,
                                        disclosure, alteration, or destruction. However, no method of transmission over the internet
                                        or electronic storage is 100% secure.</p>
                                </div>

                                <div className="policy-item">
                                    <h4 className="policy-title">Children’s Privacy</h4>
                                    <p>Our website is not intended for children under the age of 13, and we do not knowingly collect
                                        personal information from children under the age of 13. If you are a parent or guardian and
                                        believe that your child has provided us with personal information, please contact us.</p>
                                </div>

                                <div className="policy-item">
                                    <h4 className="policy-title">Changes to this Privacy Policy</h4>
                                    <p>We reserve the right to modify this Privacy Policy at any time. If we make material changes
                                        to this policy, we will notify you here or by means of a notice on our website.</p>
                                </div>

                                <div className="policy-contact">
                                    <h4 className="policy-title">Contact Us</h4>
                                    <p className="mb-10">If you have any questions or concerns about our Privacy Policy, please contact
                                        us at </p>

                                    <ul>
                                        <li>Email: <span><Link href="mailto:contact@tourigo.com">contact@tourigo.com</Link></span></li>
                                    </ul>

                                    <div className="policy-address">
                                        <p className="mb-0">
                                            <Link href="#">1426 Center StreetBend, or <br/> 97702, California, USA</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PrivacyPolicy;