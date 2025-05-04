import WishlistMain from "@/components/wishlist-tourist/WishlistMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Wishlist">
        <Wrapper>
          <main>
            {/*  */}
            <WishlistMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
