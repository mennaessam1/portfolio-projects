"use client";
import TourDetailsMain from "@/components/place-details/TourDetailsMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <>
      <MetaData pageTitle="Place Details">
        <Wrapper>
          <main>
            <TourDetailsMain id={id} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default page;
