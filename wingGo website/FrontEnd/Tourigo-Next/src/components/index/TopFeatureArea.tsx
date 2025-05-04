'use client'
import { topFeatureData } from '@/data/home/home-top-feature-data';
import { imageLoader } from '@/hooks/image-loader';
import Image from 'next/image';
import React from 'react';

const TopFeatureArea = () => {
    return (
        <>
            <div className="feature-area landing-feature section-space">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-6 col-lg-6">
                            <div className="section-title-wrapper text-center section-title-space">
                                <span className="section-subtitle mb-10">Top Feature</span>
                                <h2 className="section-title">Bundled with Popular Creative Features</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-24">
                        <div className="col-12">
                            <div className="features-wrapper">
                                {
                                    topFeatureData.length >= 0 ? (
                                        topFeatureData.map(item => <div key={item.id} className="features-item wow bdFadeInUp" data-wow-delay={item.timeDelay}>
                                            <div className="features-content">
                                                <div className={`features-icon ${item.hoverColor}`}>
                                                    <Image src={item.img} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="image" />
                                                </div>
                                                <h4 className="features-title">{item.featureTitle}</h4>
                                                <p>{item.description}</p>
                                            </div>
                                            <div className={`features-tag ${item.hoverColor}`}>
                                                <span>{item.featureTag}</span>
                                            </div>
                                        </div>)
                                    ) : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopFeatureArea;