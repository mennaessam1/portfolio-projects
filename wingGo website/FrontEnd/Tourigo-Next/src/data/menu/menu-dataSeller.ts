import { MenuType } from "@/interFace/interFace";
import homeOneImg from "../../../public/assets/images/menu/menu-home-1.jpg";
import homeTowImg from "../../../public/assets/images/menu/menu-home-2.jpg";
import homeThreeImg from "../../../public/assets/images/menu/menu-home-3.jpg";
import homeFourImg from "../../../public/assets/images/menu/menu-home-4.jpg";
import homeFiveImg from "../../../public/assets/images/menu/menu-home-5.jpg";

const menu_data: MenuType[] = [
  {
    id: 2,
    hasDropdown: true,
    children: false,
    megaMenu: true,
    active: true,
    title: "Products",
    pluseIncon: true,
    pageLayout: true,
    link: "/Products-seller",
  },
  {
    id: 3,
    hasDropdown: true,
    children: false,
    megaMenu: true,
    active: true,
    title: "Add Product",
    pluseIncon: true,
    pageLayout: true,
    link: "/add-product-copy",
    
  },
  {
    id: 4,
    hasDropdown: true,
    children: false,
    megaMenu: true,
    active: true,
    title: "Products",
    pluseIncon: true,
    pageLayout: true,
    link: "/Products-seller",
    
  },
  {
    id: 5,
    hasDropdown: true,
    children: false,
    megaMenu: true,
    active: true,
    title: "Report sales",
    pluseIncon: true,
    pageLayout: true,
    link: "/sales-view-seller",
    
  },
  {
    id: 6,
    hasDropdown: true,
    children: false,
    megaMenu: true,
    active: true,
    title: "My profile",
    pluseIncon: true,
    pageLayout: true,
    link: "/seller/my-profile",
    
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
