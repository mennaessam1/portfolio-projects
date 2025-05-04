import Link from 'next/link';
import React from 'react';

const PaginationWrapperTwo = () => {
    return (
        <>
            <div className="pagination-wrapper">
                <div className="basic-pagination">
                    <nav>
                        <ul>
                            <li>
                                <Link href='#' className="current">1</Link>
                            </li>
                            <li>
                                <Link href="#">2</Link>
                            </li>
                            <li>
                                <Link href="#">3</Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <i className="fa-light fa-angle-right"></i>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default PaginationWrapperTwo;