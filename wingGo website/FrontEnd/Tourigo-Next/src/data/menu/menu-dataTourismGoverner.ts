import { MenuType } from "@/interFace/interFace";
import homeOneImg from "../../../public/assets/images/menu/menu-home-1.jpg";
import homeTowImg from "../../../public/assets/images/menu/menu-home-2.jpg";
import homeThreeImg from "../../../public/assets/images/menu/menu-home-3.jpg";
import homeFourImg from "../../../public/assets/images/menu/menu-home-4.jpg";
import homeFiveImg from "../../../public/assets/images/menu/menu-home-5.jpg";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  username: string;
  id: string;
  role: string;
  mustChangePassword: boolean;
}
const cookie = Cookies.get("token");
let id = "";
if(cookie){
  const decodedToken = jwtDecode<DecodedToken>(cookie);
  console.log('Decoded Token:', decodedToken);
  id = decodedToken.id;
}



const menu_data: MenuType[] = [
  {
    id: 2,
    hasDropdown: true,
    active: true,
    megaMenu: true,
    children: true,
    title: "Places",
    pluseIncon: true,
    link: "/place-view-TG",
   
  },
  {
    id: 3,
    hasDropdown: true,
    children: true,
    megaMenu: true,
    active: true,
    title: "Add Place",
    pluseIncon: true,
    link: "/add-place",
  },
  
  
 
 
  {
    id: 8,
    hasDropdown: true,
    children: false,
    megaMenu: true,
    active: true,
    title: "Change Password",
    pluseIncon: true,
    pageLayout: true,
    link: `tourism-gov/change-password/${id}`,
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
