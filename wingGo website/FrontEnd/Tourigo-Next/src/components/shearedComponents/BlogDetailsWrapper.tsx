"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import blogImg from "../../../public/assets/images/blog/blog-image.png";
import blogAuthorImg from "../../../public/assets/images/blog/blog-author.png";
import blogAuthorSignImg from "../../../public/assets/images/blog/blog-author-sign.png";
import blogVideoImg from "../../../public/assets/images/blog/blog-video-poster.png";
import { imageLoader } from "@/hooks/image-loader";
import ModalVideo from "react-modal-video";
import PostCommentForm from "./PostCommentForm";
import { blogData } from "@/data/blog-data";
import { idType } from "@/interFace/interFace";

const BlogDetailsWrapper = ({ id }: idType) => {
  const filterdata = blogData?.find((item) => item?.id == id);
  //modal
  const [isOpen, setIsOpen] = useState(false);
  const openVideoModal = () => setIsOpen(!isOpen);
  return (
    <>
      {filterdata?.id ? (
        <>
          {" "}
          <div className="post-details-wrapper">
            <article className="post-details mb-25">
              <div className="post-details-thumb image-hover-effect mb-15">
                <Link href="#">
                  <Image
                    src={filterdata?.img}
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    alt="image"
                  />
                </Link>
              </div>
              <div className="post-details-content">
                <h3 className="post-details-title mb-15">
                  {filterdata?.detail}
                </h3>
                <div className="post-details-meta mb-20">
                  <ul>
                    <li>
                      <Link href="#">
                        <Image
                          src={blogAuthorImg}
                          loader={imageLoader}
                          style={{ width: "", height: "auto" }}
                          alt="author"
                        />
                        <span>By</span> Ellena M.Rice
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="icon-cleander-check"></i> Mar 18, 2028
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="icon-comment"></i> 02 Comments
                      </Link>
                    </li>
                  </ul>
                </div>
                <p className="mb-15">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla, mattis ligula consectetur, ultrices mauris.
                  Maecenas vitae mattis tellus. Nullam quis imperdiet aug
                  Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                  Curabitur pellentesque nibh nibh, at maximus ante fermentum
                  sit amet. Pellentesque commodo lacus at sodales sodales. We
                  are a team of the dedicated patent professionals, united
                  commitment toour excellence patent protection.
                </p>
                <p className="mb-20">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                  massa mi. Aliquam hendrerit urna. Pellentesque sit amet sapien
                  fringilla, mattis ligula consectetur, ultrices Maecenas
                </p>
                <div className="post-details-blockquote mb-30">
                  <blockquote>
                    <h4 className="blockquote-title">
                      The purpose of the patent system is to foster and
                      encourage new inventions of usefulness.
                    </h4>
                    <p className="d-flex justify-content-end">
                      <span>Thomas Jefferson</span>
                    </p>
                  </blockquote>
                </div>
                <div className="post-details-video mb-30">
                  <Image
                    src={blogVideoImg}
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    alt="image"
                  />
                  <div className="post-details-video-btn pos-center">
                    <button
                      onClick={() => {
                        openVideoModal();
                      }}
                      className="bd-play-btn popup-video animation-three"
                    >
                      <i className="icon-play"></i>
                    </button>
                  </div>
                </div>
                <div className="post-details-list-wrap">
                  <h4 className="mb-10">Patent Process</h4>
                  <p className="mb-20">
                    Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                    massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                    sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet
                    augue. Vestibulum auctor ornare leo, non suscipit magna
                    interdum eu.
                  </p>
                  <div className="post-details-list mb-20">
                    <ul>
                      <li>
                        <span className="list-icon">
                          <i className="fa-solid fa-check"></i>
                        </span>
                        Expertise in Patent Protection
                      </li>
                      <li>
                        <span className="list-icon">
                          <i className="fa-solid fa-check"></i>
                        </span>
                        Commitment to Excellence
                      </li>
                      <li>
                        <span className="list-icon">
                          <i className="fa-solid fa-check"></i>
                        </span>
                        Collaborative Partnerships
                      </li>
                    </ul>
                  </div>
                  <p>
                    We are a team of the dedicated patent professionals, united
                    by our commitment toour excellence patent protection. With
                    years of collective experience acros diverse industries.
                  </p>
                </div>
              </div>
              <div className="section-divider mt-30 mb-25"></div>
              <div className="post-details-tag d-flex flex-wrap gap-10 align-items-center justify-content-between">
                <div className="tagcloud">
                  <Link href="/blog-details">Travel</Link>
                  <Link href="/blog-details">TravelTips</Link>
                  <Link href="/blog-details">Foodie</Link>
                </div>
                <div className="theme-social">
                  <Link href="https://www.facebook.com/">
                    <i className="icon-facebook"></i>
                  </Link>
                  <Link href="https://www.twitter.com/">
                    <i className="icon-twitter-x"></i>
                  </Link>
                  <Link href="https://www.linkedin.com/">
                    <i className="icon-linkedin"></i>
                  </Link>
                  <Link href="https://www.youtube.com/">
                    <i className="icon-youtube"></i>
                  </Link>
                </div>
              </div>
            </article>
            <div className="post-avatar ">
              <div className="post-avatar-img">
                <Link href="#">
                  <Image
                    src={blogAuthorImg}
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    alt="image"
                  />
                </Link>
              </div>
              <div className="post-avatar-content">
                <h5 className="post-avatar-name">Ellena M. Ricee</h5>
                <span className="post-avatar-digi">UI/UX Instructor</span>
                <p className="mb-20">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Ut
                  massa mi. Aliquam in hendrerit Pellentesque sit amet sapien
                  fringilla.
                </p>
                <span className="post-avatar-signature">
                  <Image
                    src={blogAuthorSignImg}
                    loader={imageLoader}
                    style={{ width: "auto", height: "auto" }}
                    alt="sign"
                  />
                </span>
              </div>
            </div>
            {/*comment form*/}
            <PostCommentForm />
          </div>{" "}
        </>
      ) : (
        <> </>
      )}
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="eUpwDAnkgSM"
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default BlogDetailsWrapper;
