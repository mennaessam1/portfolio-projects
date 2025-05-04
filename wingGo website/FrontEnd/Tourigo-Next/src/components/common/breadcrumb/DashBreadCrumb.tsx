import Link from 'next/link';
import React from 'react';

const DashBreadCrumb = ({ titleOne, titleTwo }: {titleOne: string, titleTwo: string}) => {
    return (
        <>
            <section className="bd-breadcrumb-area style-two theme-bg-secondary" style={{ marginTop: '101px' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-md-6">
                            <div className="bd-breadcrumb-wrapper">
                                <div className="bd-breadcrumb-content">
                                    <h1 className="bd-breadcrumb-title">{titleOne}</h1>
                                    <div className="bd-breadcrumb-list justify-content-start">
                                        <span><Link href="/"><i className="icon-home"></i>WingGo</Link></span>
                                        <span>{titleTwo}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DashBreadCrumb;