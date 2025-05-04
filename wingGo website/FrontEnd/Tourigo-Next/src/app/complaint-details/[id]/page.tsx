"use client";
import ComplaintDetailsMain  from "@/components/complaint-details/TourDetailsMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const ComplaintPage  = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return (
    <>
      <MetaData pageTitle="Complaint Details">
        <Wrapper>
          <main>
            <ComplaintDetailsMain  id={id} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default ComplaintPage ;
