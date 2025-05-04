import React from 'react';
import Breadcrumb from '../common/breadcrumb/BreadCrumb';
import FaqArea from './FaqArea';
import CtaAreaStyleOne from '../shearedComponents/CtaAreaStyleOne';

const FaqMain = () => {
    return (
        <>
            <Breadcrumb titleOne='Frequently Asked Question' titleTwo='Frequently Asked Question' />
            <FaqArea />
            <CtaAreaStyleOne />
        </>
    );
};

export default FaqMain;