import BlogListLeftMain from '@/components/blog-list-left/BlogListLeftMain';
import MetaData from '@/hooks/useMetaData';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const BlogListLeft = () => {
    return (
        <>
            <MetaData pageTitle="Blog List Left">
                <Wrapper>
                    <main>
                        <BlogListLeftMain />
                    </main>
                </Wrapper>
            </MetaData>
        </>
    );
};

export default BlogListLeft;