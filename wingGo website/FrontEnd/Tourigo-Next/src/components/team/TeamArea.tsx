"use client";
import { teamData } from "@/data/team-data";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TeamArea = () => {
  return (
    <>
      <section className="bd-team-area section-space">
        <div className="container">
          <div className="row gy-24">
            {teamData &&
              teamData.slice(11, 19).map((item) => (
                <div key={item.id} className="col-xxl-3 col-xl-3 col-lg-4">
                  <div className="team-wrapper team-style-two">
                    <div className="team-content-wrap position-relative">
                      <div className="team-thumb-wrap">
                        <div className="team-thumb image-overly radius-8">
                          <Link href={`/team-details/${item?.id}`}>
                            <Image
                              src={item.img}
                              loader={imageLoader}
                              style={{ width: "100%", height: "auto" }}
                              alt="image"
                            />
                          </Link>
                        </div>
                        <div className="theme-social team-social has-white-bg">
                          <Link
                            className="icon-1"
                            target="_blank"
                            href="https://www.facebook.com/"
                          >
                            <i className="icon-facebook"></i>
                          </Link>
                          <Link
                            className="icon-2"
                            target="_blank"
                            href="https://twitter.com/"
                          >
                            <i className="icon-twitter-x"></i>
                          </Link>
                          <Link
                            className="icon-3"
                            target="_blank"
                            href="https://www.instagram.com/"
                          >
                            <i className="icon-instagram"></i>
                          </Link>
                          <Link
                            className="icon-4"
                            target="_blank"
                            href="https://bd.linkedin.com/"
                          >
                            <i className="icon-linkedin"></i>
                          </Link>
                        </div>
                      </div>
                      <div className="team-content">
                        <h6 className="team-member-name b3 underline">
                          <Link href={`/team-details/${item?.id}`}>
                            {item.name}
                          </Link>
                        </h6>
                        <span>{item.title}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="pagination-wrapper d-flex justify-content-center">
            <div className="basic-pagination">
              <nav>
                <ul>
                  <li>
                    <Link href="#" className="current">
                      1
                    </Link>
                  </li>
                  <li>
                    <Link href="#">2</Link>
                  </li>
                  <li>
                    <Link href="#">3</Link>
                  </li>
                  <li>
                    <Link href="#">
                      <i className="fa-light fa-angle-right"></i>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeamArea;
