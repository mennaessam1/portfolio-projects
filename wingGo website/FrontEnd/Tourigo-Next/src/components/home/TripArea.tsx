'use client'
import Image from 'next/image';
import React from 'react';
import { imageLoader } from '@/hooks/image-loader';
import eifelTower from '../../../public/assets/images/shapes/eiffel-tower.png';
import tripMap from '../../../public/assets/images/shapes/trip-map.png';
import tripMapSmall from '../../../public/assets/images/shapes/trip-map-small.png';
import TripAreaOne from '../shearedComponents/TripAreaOne';

const TripArea = () => {
   
    return (
        <>
            <section className="bd-trip-area section-space flash-white p-relative">
                <div className="container">
                    <div className="trip-shape">
                        <div className="trip-shape-one">
                            <Image src={eifelTower} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="shape" />
                        </div>
                        <div className="trip-shape-two">
                            <Image src={tripMap} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="shape" />
                        </div>
                        <div className="trip-shape-three">
                            <Image src={tripMapSmall} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="shape" />
                        </div>
                    </div>
                    <div className="row gy-24 align-items-center justify-content-center section-title-space">
                        <div className="col-lg-8 col-md-8">
                            <div className="section-title-wrapper text-center">
                                <span className="section-subtitle mb-10">Our Trips</span>
                                <h2 className="section-title">Trending Destination</h2>
                            </div>
                        </div>
                    </div>
                    <TripAreaOne />
                </div>
            </section>
        </>
    );
};

export default TripArea;