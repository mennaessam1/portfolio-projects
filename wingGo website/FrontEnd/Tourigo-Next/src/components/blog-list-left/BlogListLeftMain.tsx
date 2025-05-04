import React from 'react';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';
import BlogListLeft from './BlogListLeft';

const BlogListLeftMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Blog List Left' titleTwo='Blog List Left' />
            <BlogListLeft />
        </>
    );
};

export default BlogListLeftMain;