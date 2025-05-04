import React from 'react';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';
import BlogGridArea from './BlogGridArea';

const BlogGridMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Blog Grid' titleTwo='Blog Grid' />
            <BlogGridArea />
        </>
    );
};

export default BlogGridMain;