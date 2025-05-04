import ShopMain from '@/components/Products-seller/ShopMain';
import MetaData from '@/hooks/useMetaData';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <MetaData pageTitle="Products">
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


