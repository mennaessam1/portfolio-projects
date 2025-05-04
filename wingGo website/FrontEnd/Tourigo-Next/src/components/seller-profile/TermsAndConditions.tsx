
import { acceptSellerTermsAndConditions } from '@/api/SellerProfileApi';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';

interface Props {
     profileData: any,
     id: string,
     setRefreshTerms: any
    }

const TermsConditions: React.FC<Props> = ({ profileData, id, setRefreshTerms}) => {


    const acceptTerms = async () => {
        try {
            const response = await acceptSellerTermsAndConditions(id);
            console.log('Accept terms response:', response);
            setRefreshTerms(true);
          } catch (error) {
            console.error('Error accepting terms:', error);
            // Handle error (e.g., show an error message)
          }
    }   

    return (
        <>
            <section className="policy-area section-space">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="policy-wrapper p-relative z-index-1">
                                <div className="policy-item">
                                    <h4 className="policy-title">Introduction</h4>
                                    <p>Welcome to WingGo. These Terms and Conditions govern your use of our website. By accessing
                                        or using our website, you agree to be bound by these Terms and Conditions and our Privacy
                                        Policy. If you do not agree to these Terms and Conditions, please do not use our website.</p>
                                </div>

                                <div className="policy-item">
                                    <h4 className="policy-title">Use of Our Website</h4>
                                    <p className="mb-10">You may use our website for lawful purposes only. You agree not to use our
                                        website:</p>
                                    <ul>
                                        <li>In any way that violates any applicable law or regulation.</li>
                                        <li>To engage in any conduct that restricts or inhibits {`anyone's`} use or enjoyment of the
                                            website.</li>
                                    </ul>
                                </div>

                                <div className="policy-item">
                                    <h4 className="policy-title">Intellectual Property</h4>
                                    <p>All content on our website, including but not limited to text, graphics, logos, images, and
                                        software, is the property of [YourCompanyName] or its content suppliers and is protected by
                                        copyright laws.</p>
                                </div>

                                <div className="policy-item">
                                    <h4 className="policy-title">Links to Third-Party Websites</h4>
                                    <p>Our website may contain links to third-party websites that are not owned or controlled by us.
                                        We have no control over, and assume no responsibility for, the content, privacy policies, or
                                        practices of any third-party websites. You acknowledge and agree that we shall not be
                                        responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be
                                        caused by or in connection with the use of or reliance on any such content, goods, or
                                        services available on or through any such third-party websites.</p>
                                </div>

                                <div className="policy-item">
                                    <h4 className="policy-title">Limitation of Liability</h4>
                                    <p>In no event shall WingGO INC, nor its directors, employees, partners, agents, suppliers, or
                                        affiliates, be liable for any indirect, incidental, special, consequential, or punitive
                                        damages, including without limitation, loss of profits, data, use, goodwill, or other
                                        intangible losses, resulting from (i) your access to or use of or inability to access or use
                                        our website; (ii) any conduct or content of any third party on our website; (iii) any content
                                        obtained from our website; and (iv) unauthorized access, use, or alteration of your
                                        transmissions or content, whether based on warranty, contract, tort (including negligence),
                                        or any other legal theory, whether or not we have been informed of the possibility of such
                                        damage, and even if a remedy set forth herein is found to have failed of its essential
                                        purpose.</p>
                                </div>

                                <div className="policy-item">
                                    <h4 className="policy-title">Governing Law</h4>
                                    <p>These Terms and Conditions shall be governed by and construed in accordance with the laws of
                                        United State of America, without regard to its conflict of law provisions.</p>
                                </div>

                                <div className="policy-item">
                                    <h4 className="policy-title">Changes to Terms and Conditions</h4>
                                    <p>We reserve the right to modify these Terms and Conditions at any time. If we make material
                                        changes to these Terms and Conditions, we will notify you by posting the updated Terms and
                                        Conditions on our website.</p>
                                </div>

                                <div className="policy-contact">
                                    <h4 className="policy-title">Contact Us</h4>
                                    <p className="mb-10">If you have any questions or concerns about these Terms and Conditions, please
                                        contact us at</p>

                                    <ul>
                                        <li>Email: <span><Link href="mailto:contact@tourigo.com">contact@tourigo.com</Link></span></li>
                                    </ul>

                                    <div className="policy-address">
                                        <p className="mb-0">
                                            <Link href="#">1426 Center StreetBend, or <br/> 97702, California, USA</Link>
                                        </p>
                                    </div>
                                    {!(profileData?.termsAccepted) ? (
                                        <button
                                        onClick={acceptTerms}
                                        className="bd-primary-btn btn-style radius-60 mt-20"
                                    >
                                        <span className="bd-primary-btn-text">Accept Terms & Conditions</span>
                                        <span className="bd-primary-btn-circle"></span>
                                        
                                    </button>
                                    ):
                                    (<></>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TermsConditions;