'use client'
import Image from 'next/image';
import React from 'react';
import googleStoreImg from '../../../public/assets/images/app/google-store-icon.png';
import appStoreIcon from '../../../public/assets/images/app/app-store-icon.png';
import appMockupImg from '../../../public/assets/images/app/app-mockup.png';
import { imageLoader } from '@/hooks/image-loader';
import Link from 'next/link';

const DownloadArea = () => {
    return (
        <>
            <section className="bd-download-area download-space">
                <div className="container">
                    <div className="download-bg">
                        <div className="download-right-side">
                            <div className="download-wrapper">
                                <div className="download-content">
                                    <div className="section-title-wrapper mb-30">
                                        <span className="section-subtitle color-warning mb-15">Download Now!</span>
                                        <h2 className="section-title white-text mb-10">Get 20% off your Best App Tour booking
                                        </h2>
                                        <p className="white-text">Booking better on the app. Use promo code “Tourigo”</p>
                                    </div>
                                    <h6 className="download-btn-title">Get a magic link sent to your email</h6>
                                    <div className="download-btn-wrap flex-wrap">
                                        <div className="googple-play-btn">
                                            <Link href="https://codecanyon.net/item/eduman-react-native-android-ios-education-template/48934019?s_rank=3" target="_blank" className="app-btn has-bg">
                                                <div className="app-thumb">
                                                    <Image src={googleStoreImg} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="app"/>
                                                </div>
                                                <div className="content">
                                                    <span>get it on</span>
                                                    <h6>Google Play</h6>
                                                </div>
                                            </Link>
                                        </div>
                                        <div className="apple-app-btn">
                                            <Link href="https://codecanyon.net/item/eduman-react-native-android-ios-education-template/48934019?s_rank=3" target="_blank" className="app-btn has-bg">
                                                <div className="app-thumb">
                                                    <Image src={appStoreIcon} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="app"/>
                                                </div>
                                                <div className="content">
                                                    <span>Download on the</span>
                                                    <h6>App Store</h6>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="download-left-side">
                            <div className="download-thumb-wrap">
                                <div className="download-thumb">
                                    <Image src={appMockupImg} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="image"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DownloadArea;