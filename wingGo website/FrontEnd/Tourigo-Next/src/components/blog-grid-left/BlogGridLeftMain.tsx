import React from 'react';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';
import BlogGridLeftArea from './BlogGridLeftArea';

const BlogGridLeftMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Blog Grid Left' titleTwo='Blog Grid Left' />
            <BlogGridLeftArea />
        </>
    );
};

export default BlogGridLeftMain;