import Link from "next/link";
import React from "react";

const Pagination = () => {
  return (
    <>
      <div id="pagination" className="elements__area">
        <div className="wrapper">
          <h4 className="style__guide-title mb-20">Pagination</h4>
        </div>
        <div className="row gy-24 justify-content-between">
          <div className="col-xxl-5">
            <div className="pagination__wrapper">
              <div className="basic-pagination">
                <nav>
                  <ul>
                    <li>
                      <Link href="#" className="current">
                        1
                      </Link>
                    </li>
                    <li>
                      <Link href="#">2</Link>
                    </li>
                    <li>
                      <Link href="#">3</Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fa-sharp fa-regular fa-angle-right"></i>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="col-xxl-7">
            <div className="pagination__wrapper">
              <div className="basic-pagination">
                <nav>
                  <ul>
                    <li>
                      <Link href="#">
                        <i className="fa-sharp fa-regular fa-angle-left"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">1</Link>
                    </li>
                    <li>
                      <Link href="#">2</Link>
                    </li>
                    <li>
                      <span className="current">3</span>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fa-regular fa-ellipsis"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="fa-sharp fa-regular fa-arrow-right"></i>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="col-xxl-6">
            <div className="pagination__wrapper">
              <div className="basic-pagination style-2">
                <nav>
                  <ul>
                    <li>
                      <span>
                        <Link href="#">Next</Link>
                      </span>
                    </li>
                    <li>
                      <Link href="#">1</Link>
                    </li>
                    <li>
                      <Link href="#">2</Link>
                    </li>
                    <li>
                      <span className="current">3</span>
                    </li>
                    <li>
                      <span>
                        <Link href="#">Prev</Link>
                      </span>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
