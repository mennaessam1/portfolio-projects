import menu_data from "@/data/menu/menu-dataGuest";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { imageLoader } from "@/hooks/image-loader";
import { FaQuestion } from "react-icons/fa";
import Joyride, { CallBackProps, Step } from 'react-joyride';

const Menu = () => {
  const [run, setRun] = useState(false);

  const steps: Step[] = [
    {
      target: '#places-menu',
      content: 'Click here to view various landmarks!',
    },
    {
      target: '#itineraries-menu',
      content: 'Click here to browse through itineraries picked by our best Tour Guides!',
    },
    {
      target: '#activities-menu',
      content: 'Click here to complete your trip with fun activities!',
    },
    {
      target: '#login-btn',
      content: 'Click here to begin your journey and to experience the full features of the website!',
    },
  ];
    

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === 'finished' || status === 'skipped') {
      setRun(false); // Stop the guide after it's completed
    }
  };

  return (
    <>
    <Joyride
  steps={steps}
  run={run} // Trigger the guide
  callback={handleJoyrideCallback}
  showSkipButton
  continuous
  showProgress
  styles={{
    options: {
      zIndex: 10000,
      arrowColor: '#006ce4',
      backgroundColor: '#fff',
      overlayColor: 'rgba(0, 0, 0, 0.6)',
      primaryColor: '#006ce4',
      textColor: '#333',
    },
  }}
/>

      <ul>
        {menu_data.map((item) => (
          <li
            key={item.id}
            id={`${item.title.toLowerCase().replace(' ', '-')}-menu`}
            className={`${
              item?.children === true
                ? "menu-item-has-children"
                : `${item?.children === false ? "has-mega-menu" : ""}`
            } `}
          >
            <Link href={item?.link}>{item?.title}</Link>
            {/* img menu */}
            {item.previewImg === true && (
              <ul className="mega-menu home-menu-grid">
                {item?.submenus?.length && (
                  <>
                    {item?.submenus.map((subItem, index) => (
                      <li key={index}>
                        <div className="home-menu-item">
                          <div className="home-menu-thumb">
                            <Image
                              src={subItem?.prviewIMg}
                              loader={imageLoader}
                              style={{ width: "100%", height: "auto" }}
                              alt="thumb not found"
                            />
                            <div className="home-menu-buttons">
                              <Link
                                href={subItem?.link}
                                className="bd-primary-btn btn-style"
                              >
                                <span className="bd-primary-btn-text">
                                  {subItem?.title}
                                </span>
                                <span className="bd-primary-btn-circle"></span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            )}

            {/* dropdown menu */}
            {item?.hasDropdown === true && item?.submenus?.length && (
              <ul className="submenu">
                {item?.submenus?.map((dropdownItem, index) => (
                  <li key={index} className="menu-item-has-children has-arrow">
                    <Link href={dropdownItem?.link}>{dropdownItem?.title}</Link>

                    {dropdownItem?.megaMenu?.length && (
                      <ul className="submenu">
                        {dropdownItem?.megaMenu?.map(
                          (megaDropDownItem: any, megaIndex: number) => (
                            <li key={megaIndex}>
                              <Link href={megaDropDownItem?.link}>
                                {megaDropDownItem?.title}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {/* multi pages */}
            {item?.pageLayout === true && item?.submenus?.length && (
              <ul className="mega-menu mega-grid-4">
                {item?.submenus?.map((pageLayoutItem, pageLayoutIndex) => (
                  <li key={pageLayoutIndex}>
                    <Link href={pageLayoutItem?.link} className="title">
                      {pageLayoutItem?.title}
                    </Link>
                    {pageLayoutItem?.megaMenu?.length && (
                      <ul>
                        {pageLayoutItem?.megaMenu?.map(
                          (
                            singlePageItem: any,
                            singlePageItemIndex: number
                          ) => (
                            <li key={singlePageItemIndex}>
                              <Link href={singlePageItem?.link}>
                                {singlePageItem?.title}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}

<div
      style={{
        position: "absolute",
        top: "22%",
        right: "5px", // Keep it to the far-right of the screen
        paddingLeft: "30px",
        marginLeft: "20px"
      }}
    >
          <button className="bd-primary-btn btn-style radius-60 mb-10 px-50 "
            onClick={() => { window.location.href = "/sign-in";}}
            id="login-btn"
            >
              <span className="bd-primary-btn-text">Login</span>
              <span className="bd-primary-btn-circle"></span>
            </button>
            </div>

            <div
      style={{
        position: "absolute",
        top:"20%",
        right: "130px", // Keep it to the far-right of the screen
        paddingLeft: "30px",
        marginLeft: "20px"
      }}
    >
          <FaQuestion style={{fontSize: "24px", cursor: "pointer", color: "#006ce4", marginTop: "20px"}} onClick={() => setRun(true)} />
            </div>
      </ul>
    </>
  );
};

export default Menu;
