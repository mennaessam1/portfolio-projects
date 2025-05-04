import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <>
      <nav className="onepagenav">
        <ul className="mainmenu rbt-course-details-list-wrapper">
          <li className="current">
            <Link href="#colorPalette">
              <span>1. Color Palette</span>
            </Link>
          </li>
          <li>
            <Link href="#gradient">
              <span>2. Color Gradient</span>
            </Link>
          </li>
          <li>
            <Link href="#typography">
              <span>3. Typography</span>
            </Link>
          </li>
          <li>
            <Link href="#formElements">
              <span>4. Form Elements</span>
            </Link>
          </li>
          <li>
            <Link href="#pagination">
              <span>5. Pagination</span>
            </Link>
          </li>
          <li>
            <Link href="#tooltips">
              <span>6. Tooltips</span>
            </Link>
          </li>
          <li>
            <Link href="#avatar">
              <span>7. Avatar</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
