import BlogGridMain from '@/components/blog-grid/BlogGridMain';
import MetaData from '@/hooks/useMetaData';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const BlogGrid = () => {
    return (
        <>
            <MetaData pageTitle="Blog Grid">
                <Wrapper>
                    <main>
                        <BlogGridMain />
                    </main>
                </Wrapper>
            </MetaData>
        </>
    );
};

export default BlogGrid;