import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import bannerImage from "../../../public/assets/images/bg/sidebar-img.png"

const SidebarBanner = () => {
    return (
        <>
            <div className="sidebar-widget-thumb p-relative">
                <Image src={bannerImage} alt="image not found" />
            </div>
            <div className="sidebar-widget-content">
                <span className="bd-play-btn pulse-white mb-40"><i className="icon-call-ring"></i></span>
                <p className="b3 mb-0">Free Call</p>
                <h5 className="mb-25"><p>02 (908) 480-20</p></h5>
                <div className="sidebar-btn">
                </div>
            </div>
        </>
    );
};

export default SidebarBanner;