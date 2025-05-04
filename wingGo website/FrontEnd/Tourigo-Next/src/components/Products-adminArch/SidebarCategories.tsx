import Link from 'next/link';
import React from 'react';

const SidebarCategories = () => {
    return (
        <>
            <ul>
                <li className="underline-two"><Link href="/shop-details">Destination</Link>(02)</li>
                <li className="underline-two"><Link href="/shop-details">Adventure</Link>(04)</li>
                <li className="underline-two"><Link href="/shop-details">Solo Travel</Link>(02)</li>
                <li className="underline-two"><Link href="/shop-details">Cultural</Link>(05)</li>
                <li className="underline-two"><Link href="/shop-details">Luxury</Link>(03)</li>
            </ul>
        </>
    );
};

export default SidebarCategories;