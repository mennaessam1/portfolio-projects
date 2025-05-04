'use client';
import { loadSellerSalesReport } from '@/data/sales-report';
import { SellerSales } from '@/interFace/interFace';
import React, { useEffect, useState } from 'react';

// Helper function to format dates
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const RecentActivity = () => {
  const [salesReport, setSalesReport] = useState<SellerSales | null>(null);
  const [filterMonth, setFilterMonth] = useState<string>('');
  // const sellerId = '67158afc7b1ec4bfb0240575'; // Example Seller ID, replace as needed

  useEffect(() => {
    loadSellerSalesReport()
      .then(setSalesReport)
      .catch((error) => {
        console.error('Failed to load seller sales report:', error);
      });
  }, []);
  

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setFilterMonth(selectedValue);
  };

  const filterByMonth = (date: string | null | undefined): boolean => {
    if (!filterMonth) {
      return true; // Include all records when no filter is selected
    }
    if (!date || date === 'N/A') {
      return false; // Exclude records with no dates when a filter is applied
    }
    const itemMonth = new Date(date).toISOString().substring(0, 7); // Extract YYYY-MM
    return itemMonth === filterMonth; // Compare with the selected filter month
  };

  // Collect unique months from product selling dates
  const uniqueMonthsSet = new Set<string>();

  if (salesReport) {
    salesReport.data.products.details.forEach((product) => {
      product.sellingDates.forEach((date) => {
        const month = new Date(date).toISOString().substring(0, 7);
        uniqueMonthsSet.add(month);
      });
    });
  }

  // Convert the set to an array and sort it
  const uniqueMonths = Array.from(uniqueMonthsSet).sort((a, b) => a.localeCompare(b));

  return (
    <>
      {/* Filter Dropdown */}
      <div className="filter-container">
        <label htmlFor="filterMonth" className="filter-label">
          Filter by Month:
        </label>
        <select
          id="filterMonth"
          className="filter-select"
          value={filterMonth}
          onChange={handleFilterChange}
        >
          <option value="">All Months</option>
          {uniqueMonths.map((month, index) => (
            <option key={index} value={month}>
              {new Date(month + '-01').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
              })}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow-lg rounded-lg border-0">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered custom-table mb-0">
                  <thead className="table-header">
                    <tr>
                      <th>Product</th>
                      <th>Sales</th>
                      <th>Revenue</th>
                      <th>Selling Dates</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesReport ? (
                      <>
                        {/* Products Section */}
                        <tr className="section-header">
                          <td colSpan={4} className="text-center">
                            <strong>Products</strong>
                          </td>
                        </tr>
                        {salesReport.data.products.details
                          .filter((product) => {
                            // Filter products by selling dates
                            if (filterMonth && product.sellingDates.length === 0) {
                              return false; // Exclude products with no dates when a filter is applied
                            }
                            if (!filterMonth) {
                              return true; // Include all when no filter is selected
                            }
                            return product.sellingDates.some((date) => filterByMonth(date));
                          })
                          .map((product, index) => (
                            <tr key={index} className="data-row">
                              <td>{product.name}</td>
                              <td>{product.sales}</td>
                              <td>
                                {product.revenue !== null
                                  ? `$${product.revenue}`
                                  : 'N/A'}
                              </td>
                              <td>
                                {product.sellingDates.length > 0
                                  ? product.sellingDates
                                      .filter((date) => filterByMonth(date))
                                      .map((date, i) => (
                                        <span key={i}>
                                          {formatDate(date)}
                                          <br />
                                        </span>
                                      ))
                                  : 'N/A'}
                              </td>
                            </tr>
                          ))}
                        {/* Products Totals */}
                        <tr className="totals-row">
                          <td>
                            <strong>Total</strong>
                          </td>
                          <td>{salesReport.data.products.totalSales}</td>
                          <td>
                            {salesReport.data.products.totalRevenue !== null
                              ? `$${salesReport.data.products.totalRevenue}`
                              : 'N/A'}
                          </td>
                          <td>N/A</td>
                        </tr>

                        {/* Grand Totals */}
                        <tr className="grand-total">
                          <td>
                            <strong>Grand Total</strong>
                          </td>
                          <td>{salesReport.data.totals.totalSales}</td>
                          <td>
                            {salesReport.data.totals.totalRevenue !== null
                              ? `$${salesReport.data.totals.totalRevenue}`
                              : 'N/A'}
                          </td>
                          <td>N/A</td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-center">
                          <strong>Loading data...</strong>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS styles */}
      <style jsx>{`
        .custom-table {
          font-family: 'Poppins', sans-serif;
          border-collapse: collapse;
        }

        .custom-table th,
        .custom-table td {
          padding: 14px;
          text-align: center;
          border: 2px solid #ddd;
        }

        .custom-table th {
          background-color: #032040;
          color: white;
          font-size: 16px;
          font-weight: bold;
          position: sticky;
          top: 0;
          z-index: 2;
        }

        .custom-table .section-header {
          background-color: #f2f2f2;
          font-weight: bold;
          font-size: 18px;
          position: sticky;
          top: 56px;
          z-index: 1;
        }

        .custom-table .totals-row {
          background-color: #f8f9fa !important;
          font-weight: bold;
        }

        .custom-table .grand-total {
          background-color: #032040 !important;
          color: white !important;
          font-weight: bold;
        }

        .filter-container {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          justify-content: flex-end;
        }

        .filter-label {
          margin-right: 10px;
          font-weight: bold;
        }

        .filter-select {
          width: 200px;
          padding: 5px 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
      `}</style>
    </>
  );
};

export default RecentActivity;
