'use client'
import { imageLoader } from '@/hooks/image-loader';
import Image from 'next/image';
import React from 'react';
import { homeInnerPageData } from '@/data/home/home-inner-page-data';
import Link from 'next/link';

const ShowCaseArea = () => {
    return (
        <>
            <div className="inner-page-presentation-area section-space theme-bg-secondary">
                <div className="container-fluid p-0">
                    <div className="row justify-content-center">
                        <div className="col-xl-5">
                            <div className="section-title-wrapper text-center section-title-space">
                                <span className="section-subtitle text-warning mb-10">Tourigo Inner Pages</span>
                                <h2 className="section-title white-text">48+ Awesome Inner Pages</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="demo-wrapper inner-pages-wrapper">
                                <div className="row inner-pages-animation">
                                    {
                                        homeInnerPageData.length >= 0 ? (
                                            homeInnerPageData.slice(0, 9).map(item => <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6">
                                                <div className="demo-item">
                                                    <div className="solo-demo">
                                                        <Link className="solo-demo-link" target="_blank" href={item.route}>
                                                            <div className="thumbnail">
                                                                <Image src={item.img} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="Home Image" />
                                                            </div>
                                                            <div className="content text-center">
                                                                <h3 className="title">{item.title}</h3>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>)
                                        ) : ''
                                    }
                                </div>
                                <div className="row mt-30 inner-pages-animation inner-pages-animation--2">
                                    {
                                        homeInnerPageData.length >= 0 ? (
                                            homeInnerPageData.slice(10, 19).map(item => <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6">
                                                <div className="demo-item">
                                                    <div className="solo-demo">
                                                        <Link className="solo-demo-link" target="_blank" href={item.route}>
                                                            <div className="thumbnail">
                                                                <Image src={item.img} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="Home Image" />
                                                            </div>
                                                            <div className="content text-center">
                                                                <h3 className="title">{item.title}</h3>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>)
                                        ) : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowCaseArea;