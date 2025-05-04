import React from 'react';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';
import BlogGridRightArea from './BlogGridRightArea';

const BlogGridRightMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Blog Grid Right' titleTwo='Blog Grid Right' />
            <BlogGridRightArea />
        </>
    );
};

export default BlogGridRightMain;