import Link from 'next/link';
import React from 'react';

const SidebarTags = () => {
    return (
        <>
            <div className="tagcloud">
                <Link href="/shop-details">Travel</Link>
                <Link href="/shop-details">TravelTips</Link>
                <Link href="/shop-details">Foodie</Link>
                <Link href="/shop-details">Hill</Link>
                <Link href="/shop-details">Tourism</Link>
                <Link href="/shop-details">Journey</Link>
            </div>
        </>
    );
};

export default SidebarTags;