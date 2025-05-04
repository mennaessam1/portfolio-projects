import Link from "next/link";
import React from "react";
type TProps = {
  titleOne: string | undefined;
  titleTwo?: string | undefined;
};
const ElementBreadcrumb = ({ titleOne, titleTwo }: TProps) => {
  return (
    <>
      <section className="bd-breadcrumb-area style-two theme-bg-secondary">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-md-6">
              <div className="bd-breadcrumb-wrapper">
                <div className="bd-breadcrumb-content">
                  <h1 className="bd-breadcrumb-title">{titleOne}</h1>
                  <div className="bd-breadcrumb-list justify-content-start">
                    <span>
                      <Link href="/home">
                        <i className="icon-home"></i>Tourigo
                      </Link>
                    </span>
                    <span>Elements</span>
                    <span>{titleTwo}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ElementBreadcrumb;
