import BlogGridLeftMain from '@/components/blog-grid-left/BlogGridLeftMain';
import MetaData from '@/hooks/useMetaData';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const BlogGridLeft = () => {
    return (
        <>
            <MetaData pageTitle="Blog Grid Left">
                <Wrapper>
                    <main>
                        <BlogGridLeftMain />
                    </main>
                </Wrapper>
            </MetaData>
        </>
    );
};

export default BlogGridLeft;