import ElementsTestimonialMain from "@/components/elements/layout-four/elements-testimonial/ElementsTestimonialMain";
import MetaData from "@/hooks/useMetaData";
import ElementPageLayout from "@/layout/ElementPageLayout";
import React from "react";

const page = () => {
  return (
    <>
      <MetaData pageTitle="Elements Testimonial ">
        <ElementPageLayout>
          <main>
            <ElementsTestimonialMain />
          </main>
        </ElementPageLayout>
      </MetaData>
    </>
  );
};

export default page;
