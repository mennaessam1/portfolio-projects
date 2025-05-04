import { imageLoader } from "@/hooks/image-loader";
import { IBlogDataType } from "@/interFace/interFace";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface IBlogPropsType {
  item: IBlogDataType;
  className?: string;
  blogWrapperClass?: string;
  isparentClass: boolean;
}
const BlogSIngleCardThree = ({
  item,
  className,
  blogWrapperClass,
  isparentClass,
}: IBlogPropsType) => {
  return (
    <>
      {isparentClass === true ? (
        <>
          <div
            className={
              className ? className : "col-xxl-4 col-xl-4 col-lg-4 col-md-6"
            }
          >
            <article
              className={
                blogWrapperClass
                  ? blogWrapperClass
                  : "blog-wrapper blog-default blog-style-three"
              }
            >
              <div className="blog-thumb image-hover-effect">
                <Link href={`/blog-details/${item?.id}`}>
                  <Image
                    src={item?.img}
                    alt="img"
                    loader={imageLoader}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Link>
              </div>
              <div className="blog-tag">
                <span>
                  <Link href={`/blog-details/${item?.id}`}>Travel</Link>
                </span>
              </div>
              <div className="blog-content">
                <div className="blog-meta-list">
                  <div className="blog-meta-item">
                    <span className="meta-icon">
                      <i className="icon-person"></i>
                    </span>
                    <span className="meta-text">
                      By{" "}
                      <Link
                        className="meta-author"
                        href={`/blog-details/${item?.id}`}
                      >
                        {item?.author}
                      </Link>
                    </span>
                  </div>
                  <div className="blog-meta-item">
                    <span className="meta-icon">
                      <i className="icon-cleander-check"></i>
                    </span>
                    <span className="meta-text">
                      <Link href={`/blog-details/${item?.id}`}>
                        {item?.calender}
                      </Link>
                    </span>
                  </div>
                </div>
                <h5 className="blog-title mb-30 underline">
                  <Link href={`/blog-details/${item?.id}`}>{item?.detail}</Link>
                </h5>
                <div className="blog-btn">
                  <Link
                    href={`/blog-details/${item?.id}`}
                    className="bd-primary-btn btn-style has-arrow radius-60"
                  >
                    <span className="bd-primary-btn-arrow arrow-right">
                      <i className="fa-regular fa-arrow-right"></i>
                    </span>
                    <span className="bd-primary-btn-text">Read More</span>
                    <span className="bd-primary-btn-circle"></span>
                    <span className="bd-primary-btn-arrow arrow-left">
                      <i className="fa-regular fa-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </>
      ) : (
        <>
          <article
            className={
              blogWrapperClass
                ? blogWrapperClass
                : "blog-wrapper blog-default blog-style-three"
            }
          >
            <div className="blog-thumb image-hover-effect">
              <Link href={`/blog-details/${item?.id}`}>
                <Image
                  src={item?.img}
                  alt="img"
                  loader={imageLoader}
                  style={{ width: "100%", height: "100%" }}
                />
              </Link>
            </div>
            <div className="blog-tag">
              <span>
                <Link href={`/blog-details/${item?.id}`}>Travel</Link>
              </span>
            </div>
            <div className="blog-content">
              <div className="blog-meta-list">
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-person"></i>
                  </span>
                  <span className="meta-text">
                    By{" "}
                    <Link
                      className="meta-author"
                      href={`/blog-details/${item?.id}`}
                    >
                      {item?.author}
                    </Link>
                  </span>
                </div>
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-cleander-check"></i>
                  </span>
                  <span className="meta-text">
                    <Link href={`/blog-details/${item?.id}`}>
                      {item?.calender}
                    </Link>
                  </span>
                </div>
              </div>
              <h5 className="blog-title mb-30 underline">
                <Link href={`/blog-details/${item?.id}`}>{item?.detail}</Link>
              </h5>
              <div className="blog-btn">
                <Link
                  href={`/blog-details/${item?.id}`}
                  className="bd-primary-btn btn-style has-arrow radius-60"
                >
                  <span className="bd-primary-btn-arrow arrow-right">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                  <span className="bd-primary-btn-text">Read More</span>
                  <span className="bd-primary-btn-circle"></span>
                  <span className="bd-primary-btn-arrow arrow-left">
                    <i className="fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </article>
        </>
      )}
    </>
  );
};

export default BlogSIngleCardThree;
