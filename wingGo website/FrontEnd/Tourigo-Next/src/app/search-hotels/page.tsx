import SearchHotelsMain from "@/components/search-hotels/SearchHotelsMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const SearchHotels = () => {
  return (
    <>
      <MetaData pageTitle="Destination Grid Left">
        <Wrapper>
          <main>
            <SearchHotelsMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default SearchHotels;