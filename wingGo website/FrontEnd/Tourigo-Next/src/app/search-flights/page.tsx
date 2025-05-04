import SearchFlightsMain from "@/components/search-flights/SearchFlightsMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const SearchFlights = () => {
  return (
    <>
      <MetaData pageTitle="Destination Grid Left">
        <Wrapper>
          <main>
            <SearchFlightsMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default SearchFlights;