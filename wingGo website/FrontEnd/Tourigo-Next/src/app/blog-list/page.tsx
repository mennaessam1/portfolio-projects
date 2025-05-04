import BlogListMain from '@/components/blog-list/BlogListMain';
import MetaData from '@/hooks/useMetaData';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const BlogList = () => {
    return (
        <>
            <MetaData pageTitle="Blog List">
                <Wrapper>
                    <main>
                        <BlogListMain />
                    </main>
                </Wrapper>
            </MetaData>
        </>
    );
};

export default BlogList;