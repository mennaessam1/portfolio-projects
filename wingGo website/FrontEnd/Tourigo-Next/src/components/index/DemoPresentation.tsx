'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { imageLoader } from '@/hooks/image-loader';
import { demoPageData } from '@/data/home/home-demo-page-data';


const DemoPresentation = () => {
    return (
        <>
            <div id="homesDemos" className="home-demo-area splash-masonary-wrapper-activatio section-space">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-lg-6">
                            <div className="section-title-wrapper text-center section-title-space">
                                <span className="section-subtitle mb-10">Demos Pages</span>
                                <h2 className="section-title"><strong>5</strong> Wonderful Top Quality Demos Pages</h2>
                            </div>
                        </div>
                    </div>
                    <div className="home-page-demo">
                        <div className="row gy-24 justify-content-center">
                            {
                                demoPageData.length >= 0 ? (
                                    demoPageData.map(item => <div key={item.id} className="item col-xxl-4 col-xl-4 col-lg-4 col-md-6 wow bdFadeInUp" data-wow-delay={item.timeDelay}>
                                        <Link target="_blank" href={item.route} className={item.blurStyle}>
                                            <div className="thumbnail">
                                                <Image src={item.img} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="home" />
                                            </div>
                                            <div className="content">
                                                <h6 className="title">{item.title}</h6>
                                            </div>
                                        </Link>
                                    </div>)
                                ) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DemoPresentation;