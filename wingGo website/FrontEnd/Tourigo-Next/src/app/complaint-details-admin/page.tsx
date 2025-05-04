import ComplaintDetailsMain from "@/components/complaint-details-admin/TourDetailsMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";

const ComplaintDetails = () => {
  const id = '';
  return (
    <>
      <MetaData pageTitle="Complaint Details">
        <Wrapper>
          <main>
            <ComplaintDetailsMain id={id} />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default ComplaintDetails;
