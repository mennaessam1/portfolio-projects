import BlogListRightMain from '@/components/blog-list-right/BlogListRightMain';
import MetaData from '@/hooks/useMetaData';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const BlogListRight = () => {
    return (
        <>
            <MetaData pageTitle="Blog List Right">
                <Wrapper>
                    <main>
                        <BlogListRightMain />
                    </main>
                </Wrapper>
            </MetaData>
        </>
    );
};

export default BlogListRight;