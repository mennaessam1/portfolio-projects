import Link from "next/link";
import React from "react";

interface propsType{
  propsclass:string
}

const Pagination = ({propsclass}:propsType) => {
  return (
    <>
      <div className={propsclass}>
        <ul>
          <li>
            <Link href="#">
              <i className="fal fa-angle-left"></i>
            </Link>
          </li>
          <li>
            <Link href="#">01</Link>
          </li>
          <li className="active">
            <Link href="#">02</Link>
          </li>
          <li>
            <Link href="#">03</Link>
          </li>
          <li>
            <Link href="#">
              <i className="fas fa-ellipsis-h"></i>
            </Link>
          </li>
          <li>
            <Link href="#">
              <i className="fal fa-angle-right"></i>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pagination;
