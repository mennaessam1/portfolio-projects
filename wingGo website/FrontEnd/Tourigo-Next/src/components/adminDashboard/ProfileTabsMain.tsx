import React from 'react';
import Breadcrumb from "../common/breadcrumb/BreadCrumb";
import ProfileTabs from "./ProfileTabs";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';



const ProfileTabsMain = () => {
    interface DecodedToken {
        username: string;
        id: string;
        role: string;
        mustChangePassword: boolean;
    }

    const cookie = Cookies.get('token');
    let id = '';
    if(cookie){
        const decodedToken = jwtDecode(cookie) as DecodedToken;
        console.log(decodedToken);
        id = decodedToken.id;
    }

    
    return (
        <div className="profile-tabs-main">
            
        <Breadcrumb  titleOne='My Account' titleTwo='My Account' />  
        <ProfileTabs id= {id}/>
        {/* <ProfileTabs id={"6703fe21af26882204ffaffc"}/> */}
        
        </div>
    );
    }

export default ProfileTabsMain;