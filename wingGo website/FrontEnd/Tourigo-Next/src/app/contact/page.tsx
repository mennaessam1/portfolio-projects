import ContactMain from "@/components/contact/ContactMain";
import MetaData from "@/hooks/useMetaData";
import Wrapper from "@/layout/DefaultWrapper";
import React from "react";
const ContactPage = () => {
  return (
    <>
      <MetaData pageTitle="Contact">
        <Wrapper>
          <main>
            <ContactMain />
          </main>
        </Wrapper>
      </MetaData>
    </>
  );
};

export default ContactPage;
