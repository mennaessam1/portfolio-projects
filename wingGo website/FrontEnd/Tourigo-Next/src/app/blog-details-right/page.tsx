import BlogDetailsRightMain from "@/components/blog-details-right/BlogDetailsRightMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const BlogDetailsRightPage = () => {
  const id = 1;
  return (
    <>
      <MetaData pageTitle="Blog Details Right">
        <Wrapper>
          <main>
            <BlogDetailsRightMain id={id} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default BlogDetailsRightPage;
