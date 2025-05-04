import { blogData } from "@/data/blog-data";
import { imageLoader } from "@/hooks/image-loader";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SidebarBlogList = () => {
  return (
    <>
      <div className="sidebar-widget widget">
        <h6 className="sidebar-widget-title small mb-15">Recent Tour List</h6>
        <div className="sidebar-widget-post">
          {blogData &&
            blogData.slice(15, 19).map((item) => (
              <div key={item?.id} className="recent-post">
                <div className="recent-post-thumb mr-10">
                  <Link href={`/blog-details/${item?.id}`}>
                    <Image
                      src={item?.img}
                      loader={imageLoader}
                      style={{ width: "100%", height: "100%" }}
                      alt="image"
                    />
                  </Link>
                </div>
                <div className="recent-post-content">
                  <h6 className="recent-post-title small underline">
                    <Link href={`/blog-details/${item?.id}`}>
                      {item?.detail}
                    </Link>
                  </h6>
                  <span className="recent-post-date">
                    <Link href={`/blog-details/${item?.id}`}>
                      <span>
                        <i className="icon-cleander-check"></i>
                      </span>{" "}
                      {item?.calender}
                    </Link>
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SidebarBlogList;
