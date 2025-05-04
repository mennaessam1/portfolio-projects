import React from 'react';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';
import BlogListRight from './BlogListRight';

const BlogListRightMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Blog List Right' titleTwo='Blog List Right' />
            <BlogListRight />
        </>
    );
};

export default BlogListRightMain;