import React from 'react';
import BlogListWrapper from '../shearedComponents/BlogListWrapper';

const BlogListArea = () => {

    return (
        <>
            <div className="bd-blog-list-area section-space">
                <div className="container">
                    <div className="row gy-24 justify-content-center">
                        <div className="col-xxl-8 col-xl-8 col-lg-7">
                            <BlogListWrapper />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogListArea;