import ShopMain from '@/components/shop/ShopMain';
import MetaData from '@/hooks/useMetaData';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <MetaData pageTitle="Shop">
                <Wrapper>
                    <main>
                        <ShopMain />
                    </main>
                </Wrapper>
            </MetaData>
        </>
    );
};

export default page;


