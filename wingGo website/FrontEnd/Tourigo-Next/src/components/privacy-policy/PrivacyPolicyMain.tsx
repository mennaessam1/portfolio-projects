import React from 'react';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';
import PrivacyPolicy from './PrivacyPolicy';

const PrivacyPolicyMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Privacy and Policy' titleTwo='Privacy and Policy' />
            <PrivacyPolicy />
        </>
    );
};

export default PrivacyPolicyMain;