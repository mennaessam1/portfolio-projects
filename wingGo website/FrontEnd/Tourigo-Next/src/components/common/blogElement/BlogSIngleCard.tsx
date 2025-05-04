import { imageLoader } from "@/hooks/image-loader";
import { IBlogDataType } from "@/interFace/interFace";
import RightArrowIcon from "@/svg/RightArrowIcon";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface IBlogPropsType {
  item: IBlogDataType;
  className: string;
  blogWrapperClass: string;
  isparentClass: boolean;
}

// col-xxl-4 col-xl-4 col-lg-4 col-md-6
// blog-wrapper blog-default blog-style-six
const BlogSIngleCard = ({
  item,
  className,
  blogWrapperClass,
  isparentClass,
}: IBlogPropsType) => {
  return (
    <>
      {isparentClass === true ? (
        <>
          <div className={className}>
            <article className={blogWrapperClass}>
              <div className="blog-thumb image-hover-effect">
                <Link href={`/blog-details/${item?.id}`}>
                  <Image
                    src={item.img}
                    loader={imageLoader}
                    style={{ width: "100%", height: "auto" }}
                    alt="image"
                  />
                </Link>
              </div>
              <div className="blog-content">
                <div className="blog-meta-list">
                  <div className="blog-meta-item has-seperator">
                    <span className="meta-icon">
                      <i className="icon-profile"></i>
                    </span>
                    <span className="meta-text">
                      <Link
                        className="meta-author"
                        href={`/blog-details/${item?.id}`}
                      >
                        {item.author}
                      </Link>
                    </span>
                  </div>
                  <div className="blog-meta-item">
                    <span className="meta-icon">
                      <i className="icon-cleander-check"></i>
                    </span>
                    <span className="meta-text">
                      <Link href={`/blog-details/${item?.id}`}>
                        {item.calender}
                      </Link>
                    </span>
                  </div>
                </div>
                <h5 className="blog-title mb-5 underline">
                  <Link href={`/blog-details/${item?.id}`}>{item.detail}</Link>
                </h5>
                <p>{item.description}</p>
                <div className="">
                  <div className="icon-text-btn p-relative">
                    <Link href={`/blog-details/${item?.id}`}>
                      <span>Read More </span>
                      <i>
                        <RightArrowIcon />
                      </i>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </>
      ) : (
        <>
          <article className={blogWrapperClass}>
            <div className="blog-thumb image-hover-effect">
              <Link href={`/blog-details/${item?.id}`}>
                <Image
                  src={item.img}
                  loader={imageLoader}
                  style={{ width: "100%", height: "auto" }}
                  alt="image"
                />
              </Link>
            </div>
            <div className="blog-content">
              <div className="blog-meta-list">
                <div className="blog-meta-item has-seperator">
                  <span className="meta-icon">
                    <i className="icon-profile"></i>
                  </span>
                  <span className="meta-text">
                    <Link
                      className="meta-author"
                      href={`/blog-details/${item?.id}`}
                    >
                      {item.author}
                    </Link>
                  </span>
                </div>
                <div className="blog-meta-item">
                  <span className="meta-icon">
                    <i className="icon-cleander-check"></i>
                  </span>
                  <span className="meta-text">
                    <Link href={`/blog-details/${item?.id}`}>
                      {item.calender}
                    </Link>
                  </span>
                </div>
              </div>
              <h5 className="blog-title mb-5 underline">
                <Link href={`/blog-details/${item?.id}`}>{item.detail}</Link>
              </h5>
              <p>{item.description}</p>
              <div className="">
                <div className="icon-text-btn p-relative">
                  <Link href={`/blog-details/${item?.id}`}>
                    <span>Read More </span>
                    <i>
                      <RightArrowIcon />
                    </i>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </>
      )}
    </>
  );
};

export default BlogSIngleCard;
