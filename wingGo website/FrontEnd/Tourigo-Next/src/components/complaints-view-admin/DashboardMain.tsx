//DashboardMain.tsx
import React from 'react';
import AlertArea from './AlertArea';
import CardBoxArea from './CardBoxArea';
import RecentActivity from './RecentActivity';
import DashBreadCrumb from '../common/breadcrumb/DashBreadCrumb';

const DashboardMain = () => {
    return (
        <>
            <DashBreadCrumb titleOne='Complaints Dashboard' titleTwo='View Complaints' />
            {/* <AlertArea /> */}
            {/* <CardBoxArea /> */}
            <RecentActivity />
        </>
    );
};

export default DashboardMain;