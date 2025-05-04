import React from 'react';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';
import TermsConditions from './TermsConditions';

const TermsConditionsMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Terms and Conditions' titleTwo='Terms and Conditions' />
            <TermsConditions />
        </>
    );
};

export default TermsConditionsMain;