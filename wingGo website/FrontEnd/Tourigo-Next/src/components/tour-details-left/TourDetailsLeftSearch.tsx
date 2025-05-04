import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import blogImgFourteen from '../../../public/assets/images/blog/blog-image-14.png';
import blogImgFifteen from '../../../public/assets/images/blog/blog-image-15.png';
import blogImgSixteen from '../../../public/assets/images/blog/blog-image-16.png';
import bgSidebarImg from '../../../public/assets/images/bg/sidebar-img.png';
import { imageLoader } from '@/hooks/image-loader';

const TourDetailsLeftSearch = () => {
    return (
        <>
            <aside className="sidebar-wrapper sidebar-sticky">
                    <div className="sidebar-widget-wrapper mb-30">
                        <div className="sidebar-widget widget">
                            <h6 className="sidebar-widget-title small mb-15">Search Here</h6>
                            <div className="sidebar-search">
                                <form className="sidebar-search-form" action="#" method="get">
                                    <input type="text" value="" required name="s" placeholder="Search" />
                                    <button type="submit"> <i className="far fa-search"></i> </button>
                                </form>
                            </div>
                        </div>
                        <div className="sidebar-widget-divider"></div>
                        <div className="sidebar-widget widget">
                            <h6 className="sidebar-widget-title small mb-15">Contact for Booking</h6>
                            <div className="sidebar-booking">
                                <form className="sidebar-booking-form" action="#" method="get">
                                    <div className="input-box">
                                        <input type="text" placeholder="Name"/>
                                    </div>
                                    <div className="input-box">
                                        <input type="email" placeholder="Email"/>
                                    </div>
                                    <div className="input-box">
                                        <textarea cols={30} rows={10} placeholder="Type Comment here"></textarea>
                                    </div>
                                    <div className="booking-btn">
                                        <button className="bd-btn btn-style radius-4 w-100" type="submit">Send Now<span><i className="fa-regular fa-arrow-right"></i></span></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="sidebar-widget-divider"></div>
                        <div className="sidebar-widget widget">
                            <h6 className="sidebar-widget-title small mb-15">Recent Tour List</h6>
                            <div className="sidebar-widget-post">
                                <div className="recent-post">
                                    <div className="recent-post-thumb mr-10">
                                        <Link href="/blog-details">
                                            <Image src={blogImgFourteen} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="image"/>
                                        </Link>
                                    </div>
                                    <div className="recent-post-content">
                                        <h6 className="recent-post-title small underline">
                                            <Link href="/blog-details">{`Trekker's Tales: Navigating the
                                                World's
                                                Wonders`}</Link>
                                        </h6>
                                        <span className="recent-post-price">$1999</span>
                                    </div>
                                </div>
                                <div className="recent-post">
                                    <div className="recent-post-thumb mr-10">
                                        <Link href="/blog-details">
                                            <Image src={blogImgFifteen} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="image"/>
                                        </Link>
                                    </div>
                                    <div className="recent-post-content">
                                        <h6 className="recent-post-title small underline">
                                            <Link href="/blog-details">Exploring the World, One Adventure
                                                at a
                                                Time</Link>
                                        </h6>
                                        <span className="recent-post-price">$1499</span>
                                    </div>
                                </div>
                                <div className="recent-post">
                                    <div className="recent-post-thumb mr-10">
                                        <Link href="/blog-details">
                                            <Image src={blogImgSixteen} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="image"/>
                                        </Link>
                                    </div>
                                    <div className="recent-post-content">
                                        <h6 className="recent-post-title small underline">
                                            <Link href="/blog-details">Fast-Track to Your Dream
                                                Destinations</Link>
                                        </h6>
                                        <span className="recent-post-price">$2599</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-widget-banner p-relative">
                        <div className="sidebar-widget-thumb p-relative">
                            <Image src={bgSidebarImg} loader={imageLoader} style={{ width: '100%', height: "auto" }} alt="img"/>
                        </div>
                        <div className="sidebar-widget-content">
                            <span className="bd-play-btn pulse-white mb-40"><i className="icon-call-ring"></i></span>
                            <p className="b3 mb-0">Free Call</p>
                            <h5 className="mb-25"><Link href="/tel:+0290848020">02 (908) 480-20</Link></h5>
                            <div className="sidebar-btn">
                                <Link className="bd-text-btn style-two" href="/blog-list-right">Contact
                                    <span className="icon__box">
                                        <i className="fa-light fa-angle-right icon__first"></i>
                                        <i className="fa-light fa-angle-right icon__second"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>
        </>
    );
};

export default TourDetailsLeftSearch;