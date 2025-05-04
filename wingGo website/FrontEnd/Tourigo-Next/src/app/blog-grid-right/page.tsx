import BlogGridRightMain from '@/components/blog-grid-right/BlogGridRightMain';
import MetaData from '@/hooks/useMetaData';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const BlogGridRight = () => {
    return (
        <>
            <MetaData pageTitle="Blog Grid Right">
                <Wrapper>
                    <main>
                        <BlogGridRightMain />
                    </main>
                </Wrapper>
            </MetaData>
        </>
    );
};

export default BlogGridRight;