import BlogDetailsLeftMain from "@/components/blog-details-left/BlogDetailsLeftMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const BlogDetailsLeftDynamicPage = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  return (
    <>
      <MetaData pageTitle="Blog Details Left">
        <Wrapper>
          <main>
            <BlogDetailsLeftMain id={id} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default BlogDetailsLeftDynamicPage;
