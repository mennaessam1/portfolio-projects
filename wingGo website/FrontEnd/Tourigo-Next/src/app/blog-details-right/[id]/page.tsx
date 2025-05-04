import BlogDetailsRightMain from "@/components/blog-details-right/BlogDetailsRightMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const BlogDetailsRightDynamicPage = ({
  params,
}: {
  params: { id: number };
}) => {
  const id = params.id;
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

export default BlogDetailsRightDynamicPage;
