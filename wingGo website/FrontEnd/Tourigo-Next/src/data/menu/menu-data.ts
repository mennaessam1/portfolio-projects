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
    children: false,
    active: true,
    title: "Guest",
    pluseIncon: true,
    link: "/home",
   
  },
  {
    id: 2,
    hasDropdown: true,
    active: true,
    megaMenu: true,
    children: true,
    title: "Tourist",
    pluseIncon: true,
    link: "/home-two",
    
  },
  {
    id: 3,
    hasDropdown: true,
    children: true,
    megaMenu: true,
    active: true,
    title: "Tour Guide",
    pluseIncon: true,
    link: "/home-three",
    
  },
  {
    id: 4,
    hasDropdown: true,
    children: false,
    megaMenu: true,
    active: true,
    title: "Advertiser",
    pluseIncon: true,
    pageLayout: true,
    link: "/home-four",
  },
  {
    id: 5,
    hasDropdown: true,
    children: false,
    megaMenu: true,
    active: true,
    title: "Seller",
    pluseIncon: true,
    pageLayout: true,
    link: "/home-five",
    
  },
  {
    id: 6,
    hasDropdown: true,
    children: true,
    megaMenu: true,
    active: true,
    title: "Admin",
    pluseIncon: true,
    lastDropdown: true,
    link: "/home-six",
    
  },
  {
    id: 7,
    hasDropdown: true,
    children: true,
    megaMenu: true,
    active: true,
    title: "Tourism governer",
    pluseIncon: true,
    lastDropdown: true,
    link: "/home-eight",
    
  },
  {
    id: 8,
    hasDropdown: true,
    children: true,
    megaMenu: true,
    active: true,
    title: "Sign Up",
    pluseIncon: true,
    lastDropdown: true,
    link: "/sign-up",
    
  },
];

export default menu_data;
