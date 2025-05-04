import React from 'react';
import ContactAddressArea from './ContactAddressArea';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';
import ContactFormArea from './ContactFormArea';
import ContactMapArea from './ContactMapArea';

const ContactMain = () => {
    return (
        <>
         <Breadcrumb titleOne='Contact Us' titleTwo='Contact Us'/>   
         <ContactAddressArea />
         <ContactFormArea />
         <ContactMapArea />
        </>
    );
};

export default ContactMain;