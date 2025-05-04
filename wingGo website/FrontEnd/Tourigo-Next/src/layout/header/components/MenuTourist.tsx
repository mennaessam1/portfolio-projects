import menu_data from "@/data/menu/menu-dataTourist";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {useState, useEffect, useRef } from "react";
import { imageLoader } from "@/hooks/image-loader";
import { useCurrency } from "@/contextApi/CurrencyContext";
import {getTouristNotificationsApi} from "@/api/PrefrenceApi"
import {Notification} from "@/interFace/interFace"
import { FaBell, FaQuestion } from "react-icons/fa";
import Cookies from "js-cookie";
import Joyride, { CallBackProps, Step } from 'react-joyride';


const Menu = () => {
  const { setCurrency, currency } = useCurrency(); // Access setCurrency from CurrencyContext
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [run, setRun] = useState(false);

  const steps: Step[] = [
    {
      target: '#products-menu',
      content: 'View various product categories here.',
    },
    {
      target: '#places-menu',
      content: 'Discover amazing places to visit.',
    },
    {
      target: '#itineraries-menu',
      content: 'Plan your trip using our itineraries feature.',
    },
    {
      target: '#activities-menu',
      content: 'Explore activities to enhance your trip.',
    },
    {
      target: '#history-menu',
      content: 'View your itinerary, activity, products booking history here.',
    },
    {
      target: '#complaints-menu',
      content: 'Submit complaints or queries here.',
    },
    {
      target: '#booking-menu',
      content: 'Book hotels, flights, and other services here.',
    },
    {
      target: '#currency-menu',
      content: 'Select your preferred currency here.',
    },
    {
      target: '#profile-menu',
      content: 'Manage your profile settings here',
    },
    {
      target: '#logout-button',
      content: 'Log out of your account securely here.',
    },
    
    
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === 'finished' || status === 'skipped') {
      setRun(false); // Stop the guide after it's completed
    }
  };

const handleBellClick = () => {
  setShowDropdown((prev) => !prev);
};

// useEffect(() => {
//   const fetchNotifications = async () => {
//     try {
//       const data = await getTouristNotificationsApi(); // Pass the user's ID
//       setNotifications(data);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchNotifications();
// }, []);

useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const data: Notification[] = await getTouristNotificationsApi(); // Fetch notifications and specify the type
      const sortedData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() // Use .getTime() to ensure numeric comparison
      );
      setNotifications(sortedData); // Set sorted notifications
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchNotifications();
}, []);


  const handleCurrencyChange = (newCurrency: "USD" | "EUR" | "EGP") => { 
    setCurrency(newCurrency); // Update currency context
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
      <ul className="mb-20">
        {menu_data.map((item) => (
          <li
            key={item.id}
            id={`${item.title.toLowerCase().replace(' ', '-')}-menu`} // Add an ID for each menu item
            className={`${
              item?.children === true
                ? "menu-item-has-children"
                : `${item?.children === false ? "has-mega-menu" : ""}`
            } `}
            style={{ marginTop: "25px"}}
          >

{item.id === 11 ? ( // Check for the Bell Icon ID
      <div
      style={{
        position: "absolute",
        top: "45%", // Vertically center it within the navigation bar
        right: "150px", // Keep it to the far-right of the screen
        //paddingLeft: "30px",
        //marginLeft: "20px"
      }}
    >
        <FaBell
          style={{
            fontSize: "24px",
            cursor: "pointer",
            color: "#006ce4", // Adjust the color to match your design
          }}
          onClick={() => {
            // Toggle notification dropdown visibility
            setShowDropdown((prev) => !prev);
          }}
        />
        {notifications?.length > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              fontSize: "12px",
              width: "20px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {notifications.length}
          </span>
        )}
        {showDropdown && (
          <div
            style={{
              position: "absolute",
              top: "30px",
              right: "0",
              background: "white",
              border: "1px solid #ccc",
              borderRadius: "8px",
              width: "300px",
              padding: "10px",
              zIndex: 1000,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              maxHeight: "200px", // Limit dropdown height
              overflowY: "auto", // Enable scrolling
            }}
          >
            {loading ? (
              <p>Loading notifications...</p>
            ) : notifications.length > 0 ? (
              <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
                {notifications.map((notification) => (
                  <li
                    key={notification._id}
                    style={{
                      marginBottom: "10px",
                      padding: "8px",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                      {notification.message}
                    <br />
                    <small style={{ color: "#888" }}>
                      {new Date(notification.date).toLocaleDateString()}
                    </small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No notifications yet.</p>
            )}
          </div>
        )}
      </div>
    ) : (
      <Link href={item?.link}>{item?.title}</Link>
    )}

            {/* Render dropdown for Currency Selector */}
            {item.title === "Currency" && (
              <ul className="submenu">
                {item?.submenus?.map((currencyOption, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleCurrencyChange(currencyOption.currency as "USD" | "EUR" | "EGP")}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: currency === currencyOption.currency ? "blue" : "inherit", 
                      }}
                    >
                      {currencyOption.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}

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

            {/* dropdown menu for other items */}
            {item.hasDropdown && item.submenus && item.title !== "Currency" && (
              <ul className="submenu">
                {item.submenus.map((dropdownItem, index) => (
                  <li key={index} className="menu-item-has-children has-arrow">
                    <Link href={dropdownItem?.link}>{dropdownItem?.title}</Link>
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
        top:"20%",
        right: "5px", // Keep it to the far-right of the screen
        paddingLeft: "30px",
        marginLeft: "20px"
      }}
    >
          <button className="bd-primary-btn btn-style radius-60 mb-10 px-50 mt-20"
            onClick={() => {const cookie = Cookies.remove("token"); window.location.href = "/";}}
            id="logout-button"
            >
              <span className="bd-primary-btn-text">Logout</span>
              <span className="bd-primary-btn-circle"></span>
            </button>
            </div>

            <div
      style={{
        position: "absolute",
        top:"20%",
        right: "200px", // Keep it to the far-right of the screen
        paddingLeft: "30px",
        marginLeft: "20px"
      }}
    >
          <FaQuestion style={{fontSize: "24px", cursor: "pointer", color: "#006ce4", marginTop: "37px"}} onClick={() => setRun(true)} />
            </div>
      </ul>

      
      {/* <p>Current selected currency: {currency}</p> */}
    </>
  );
};

export default Menu;
