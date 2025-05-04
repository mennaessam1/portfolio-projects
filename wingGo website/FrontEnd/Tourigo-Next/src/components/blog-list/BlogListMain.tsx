import React from 'react';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';
import BlogListArea from './BlogListArea';

const BlogListMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Blog List' titleTwo='Blog List' />
            <BlogListArea />
        </>
    );
};

export default BlogListMain;