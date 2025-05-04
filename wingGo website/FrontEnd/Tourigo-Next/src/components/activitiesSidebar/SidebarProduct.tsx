import products_data from '@/data/product-data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SidebarProduct = () => {
    return (
        <>
            <div className="sidebar-widget-post">
                {
                    products_data.slice(18, 21).map((item) => (
                        <div className="best-sell-post" key={item.id}>
                            <div className="best-sell-post-thumb mr-10">
                                <Link href={`/shop-details/${item.id}`}>
                                    <Image src={item.image} alt="image not found" />
                                </Link>
                            </div>
                            <div className="best-sell-post-content">
                                <h6 className="best-sell-post-title small underline">
                                    <Link href={`/shop-details/${item.id}`}>{item.title}</Link>
                                </h6>
                                <div className="best-sell-post-price">{`$${item.price}`}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default SidebarProduct;