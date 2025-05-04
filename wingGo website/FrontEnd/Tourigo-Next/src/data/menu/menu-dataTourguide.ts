import { MenuType } from "@/interFace/interFace";
import homeOneImg from "../../../public/assets/images/menu/menu-home-1.jpg";
import homeTowImg from "../../../public/assets/images/menu/menu-home-2.jpg";
import homeThreeImg from "../../../public/assets/images/menu/menu-home-3.jpg";
import homeFourImg from "../../../public/assets/images/menu/menu-home-4.jpg";
import homeFiveImg from "../../../public/assets/images/menu/menu-home-5.jpg";

const menu_data: MenuType[] = [
  {
    id: 1,
    hasDropdown: true,
    active: true,
    megaMenu: true,
    children: true,
    title: "Itineraries",
    pluseIncon: true,
    link: "/it-view-tourguide",
   
  },
  {
    id: 2,
    hasDropdown: true,
    children: true,
    megaMenu: true,
    active: true,
    title: "Add Itinerary",
    pluseIncon: true,
    link: "/add-it",
  },
  {
    id: 3,
    hasDropdown: true,
    children: true,
    megaMenu: true,
    active: true,
    title: "Report Sales",
    pluseIncon: true,
    link: "/sales-view-tourguide",
  },
  {
    id: 4,
    hasDropdown: true,
    children: true,
    megaMenu: true,
    active: true,
    title: "Tourist Report",
    pluseIncon: true,
    link: "/tourist-report-view-tourguide",
  },
  
  {
    id: 3,
    hasDropdown: true,
    children: false,
    megaMenu: true,
    active: true,
    title: "My Profile",
    pluseIncon: true,
    pageLayout: true,
    link: "/tour-guide/my-profile",
  },
  {
    id: 11, // Unique ID for the bell icon
    hasDropdown: true, // Enables the dropdown for notifications
    children: false, // No submenus in this case
    megaMenu: false,
    active: true,
    title: "", // No visible title, only the icon
    pluseIncon: false,
    link: "#", // No link since it’s an icon
    // icon: true, // Custom property to indicate this is an icon
},
  
];

export default menu_data;
