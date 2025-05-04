import React from "react";

type TProps = {
  title: string | undefined;
};

const BreadCrumbTitle = ({ title }: TProps) => {
  return (
    <>
      <div className="elements-breadcrumb-area section-space">
        <div className="container">
          <div className="col-lg-12">
            <div className="section-title-wrapper text-center fix">
              <div className="elements-section__wrapper elements-line">
                <div className="separator__line line-left"></div>
                <div className="elements-title__wrapper">
                  <h2 className="section__title elements__title">{title}</h2>
                </div>
                <div className="separator__line line-right"></div>
              </div>
              <p className="muted-text"></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadCrumbTitle;
