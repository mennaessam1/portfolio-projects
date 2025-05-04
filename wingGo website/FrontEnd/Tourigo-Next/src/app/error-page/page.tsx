import ErrorPageArea from "@/components/error-page/ErrorPageArea";
import MetaData from "@/hooks/useMetaData";
import React from "react";

const ErrorPage = () => {
  return (
    <>
      <MetaData pageTitle="Error 404">
        <main>
          <ErrorPageArea />
        </main>
      </MetaData>
    </>
  );
};

export default ErrorPage;
