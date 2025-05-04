'use client';
import { loadSalesReport } from '@/data/sales-report';
import { SalesReport } from '@/interFace/interFace';
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
  const [salesReport, setSalesReport] = useState<SalesReport | null>(null);
  const [filterMonth, setFilterMonth] = useState<string>('');

  useEffect(() => {
    loadSalesReport().then(setSalesReport);
  }, []);

  useEffect(() => {
    console.log('Current Filter Month:', filterMonth);
  }, [filterMonth]);
  

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setFilterMonth(selectedValue); // Keep the correct filter state
  };
  
  const filterByMonth = (date: string | null | undefined): boolean => {
    // Include all records when no filter is selected
    if (!filterMonth) {
      return true;
    }
  
    // Exclude records with no dates or 'N/A' when a specific month is selected
    if (!date || date === 'N/A') {
      return false;
    }
  
    // Compare the month portion of the date with the filter
    const itemMonth = new Date(date).toISOString().substring(0, 7); // Extract YYYY-MM
    return itemMonth === filterMonth;
  };
  
  
  // Collect unique months from activities, itineraries, and products
  const uniqueMonthsSet = new Set<string>();

  if (salesReport) {
    salesReport.data.activities.details.forEach(activity => {
      const month = new Date(activity.soldDate).toISOString().substring(0, 7);
      uniqueMonthsSet.add(month);
    });

    salesReport.data.itineraries.details.forEach(itinerary => {
      itinerary.soldDates.forEach(date => {
        const month = new Date(date).toISOString().substring(0, 7);
        uniqueMonthsSet.add(month);
      });
    });

    salesReport.data.products.details.forEach(product => {
      product.sellingDates.forEach(date => {
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
        <label htmlFor="filterMonth" className="filter-label">Filter by Month:</label>
        <select
          id="filterMonth"
          className="filter-select"
          value={filterMonth}
          onChange={handleFilterChange}
        >
          <option value="">All Months</option>
          {uniqueMonths.map((month, index) => (
            <option key={index} value={month}>
              {new Date(month + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
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
                      <th>Item</th>
                      <th>Sales</th>
                      <th>Revenue</th>
                      <th>App Revenue</th>
                      <th>Date(s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesReport ? (
                      <>
                        {/* Activities Section */}
                        <tr className="section-header">
                          <td colSpan={5} className="text-center">
                            <strong>Activities</strong>
                          </td>
                        </tr>
                        {salesReport.data.activities.details
  .filter(activity => filterByMonth(activity.soldDate)) // Apply filtering here
  .map((activity, index) => (
    <tr key={index} className="data-row">
      <td>{activity.name}</td>
      <td>{activity.sales}</td>
      <td>{activity.revenue !== null ? `$${activity.revenue}` : 'N/A'}</td>
      <td>{activity.appRevenue !== null ? `$${activity.appRevenue}` : 'N/A'}</td>
      <td>{activity.soldDate ? formatDate(activity.soldDate) : 'N/A'}</td>
    </tr>
  ))}

                        {/* Activities Totals */}
                        <tr className="totals-row">
                          <td><strong>Total</strong></td>
                          <td>{salesReport.data.activities.totalSales}</td>
                          <td>
                            {salesReport.data.activities.totalRevenue !== null ? `$${salesReport.data.activities.totalRevenue}` : 'N/A'}
                          </td>
                          <td>
                            {salesReport.data.activities.totalAppRevenue !== null ? `$${salesReport.data.activities.totalAppRevenue}` : 'N/A'}
                          </td>
                          <td>N/A</td>
                        </tr>

                        {/* Itineraries Section */}
                        <tr className="section-header">
                          <td colSpan={5} className="text-center">
                            <strong>Itineraries</strong>
                          </td>
                        </tr>
                        {salesReport.data.itineraries.details
  .filter(itinerary => {
    // Exclude records with no dates when a specific filter is applied
    if (filterMonth && itinerary.soldDates.length === 0) {
      return false;
    }

    // Include all records when "All Months" is selected
    if (!filterMonth) {
      return true;
    }

    // Match specific months
    return itinerary.soldDates.some(date => filterByMonth(date));
  })
  .map((itinerary, index) => (
    <tr key={index} className="data-row">
      <td>{itinerary.name}</td>
      <td>{itinerary.sales}</td>
      <td>{itinerary.revenue !== null ? `$${itinerary.revenue}` : 'N/A'}</td>
      <td>{itinerary.appRevenue !== null ? `$${itinerary.appRevenue}` : 'N/A'}</td>
      <td>
        {itinerary.soldDates.length > 0
          ? itinerary.soldDates
              .filter(date => filterByMonth(date))
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

                        {/* Itineraries Totals */}
                        <tr className="totals-row">
                          <td><strong>Total</strong></td>
                          <td>{salesReport.data.itineraries.totalSales}</td>
                          <td>
                            {salesReport.data.itineraries.totalRevenue !== null ? `$${salesReport.data.itineraries.totalRevenue}` : 'N/A'}
                          </td>
                          <td>
                            {salesReport.data.itineraries.totalAppRevenue !== null ? `$${salesReport.data.itineraries.totalAppRevenue}` : 'N/A'}
                          </td>
                          <td>N/A</td>
                        </tr>

                        {/* Products Section */}
                        <tr className="section-header">
                          <td colSpan={5} className="text-center">
                            <strong>Products</strong>
                          </td>
                        </tr>
                        {salesReport.data.products.details
  .filter(product => {
    // Exclude records with no dates when a specific filter is applied
    if (filterMonth && product.sellingDates.length === 0) {
      return false;
    }

    // Include all records when "All Months" is selected
    if (!filterMonth) {
      return true;
    }

    // Match specific months
    return product.sellingDates.some(date => filterByMonth(date));
  })
  .map((product, index) => (
    <tr key={index} className="data-row">
      <td>{product.name}</td>
      <td>{product.sales}</td>
      <td>{product.revenue !== null ? `$${product.revenue}` : 'N/A'}</td>
      <td>{product.appRevenue !== null ? `$${product.appRevenue}` : 'N/A'}</td>
      <td>
        {product.sellingDates.length > 0
          ? product.sellingDates
              .filter(date => filterByMonth(date))
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
                          <td><strong>Total</strong></td>
                          <td>{salesReport.data.products.totalSales}</td>
                          <td>
                            {salesReport.data.products.totalRevenue !== null ? `$${salesReport.data.products.totalRevenue}` : 'N/A'}
                          </td>
                          <td>N/A</td>
                          <td>N/A</td>
                        </tr>

                        {/* Grand Totals */}
                        <tr className="grand-total">
                          <td><strong>Grand Total</strong></td>
                          <td>{salesReport.data.totals.totalSales}</td>
                          <td>
                            {salesReport.data.totals.totalRevenue !== null ? `$${salesReport.data.totals.totalRevenue}` : 'N/A'}
                          </td>
                          <td>
                            {salesReport.data.totals.totalAppRevenue !== null ? `$${salesReport.data.totals.totalAppRevenue}` : 'N/A'}
                          </td>
                          <td>N/A</td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center">
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

      {/* CSS styles for the component */}
      <style jsx>{`
        .custom-table {
          font-family: 'Poppins', sans-serif;
          border-collapse: collapse;
        }

        .custom-table th, .custom-table td {
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

        /* Totals row with light gray background */
        .custom-table .totals-row {
          background-color: #f8f9fa !important;
          font-weight: bold;
        }

        .custom-table .totals-row td {
          background-color: #f1f1f1 !important;
        }

        /* Grand total with contrasting background */
        .custom-table .grand-total {
          background-color: #032040 !important;
          color: white !important;
          font-weight: bold;
        }

        .custom-table .data-row:hover {
          background-color: #f9f9f9;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .card-body {
          background-color: #f8f9fa;
          padding: 30px;
          border-radius: 15px;
        }

        /* Filter container styling */
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

        /* Optional: Additional styling for better appearance */
        .filter-container {
          justify-content: flex-end;
        }

        @media (max-width: 576px) {
          .filter-container {
            flex-direction: column;
            align-items: flex-start;
          }

          .filter-label {
            margin-bottom: 5px;
          }

          .filter-select {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default RecentActivity;
