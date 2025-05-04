import React from "react";

const Typography = () => {
  return (
    <>
      <div id="typography" className="elements__area">
        <div className="wrapper">
          <h4 className="style__guide-title mb-20">Typography</h4>
          <div className="row g-5">
            <div className="col-lg-6">
              <h1 className="mb-20 title-font">Title Font</h1>
              <h1 className="mb-20">H1. Heading 1</h1>
              <h2 className="mb-20">H2. Heading 2</h2>
              <h3 className="mb-20">H3. Heading 3</h3>
              <h4 className="mb-20">H4. Heading 4</h4>
              <h5 className="mb-20">H5. Heading 5</h5>
              <h6 className="mb-20">H6. Heading 6</h6>
            </div>
            <div className="col-lg-6">
              <p className="b1 mb-20">
                B1- Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                massa mi. Aliquam in hendrerit urna.
              </p>
              <p className="b2 mb-20">
                B2- Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
              </p>
              <p className="b3 mb-20">
                B3- Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
              </p>
              <p className="b4">
                B4- Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
              </p>
            </div>
          </div>
          <div className="elements__divider">
            <hr />
          </div>
          <div className="row align-items-center">
            <div className="section__guide">
              <h4 className="style__guide-title">Subtitle Style</h4>
            </div>
            <div className="col-xl-auto col-lg-6 col-md-6 mt-30">
              <div className="subtitle text-center">
                <span className="section-subtitle">Section subtitle One</span>
              </div>
            </div>
            <div className="col-xl-auto col-lg-6 col-md-6 mt-30">
              <div className="subtitle text-center">
                <span className="section-subtitle text-warning">
                  Section subtitle Two
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Typography;
