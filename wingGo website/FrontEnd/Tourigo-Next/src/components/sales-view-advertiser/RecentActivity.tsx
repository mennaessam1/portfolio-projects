'use client';
import { loadAdvertiserSalesReport } from '@/data/sales-report'; // Correct path for the advertiser sales report
import { AdvertiserSales } from '@/interFace/interFace'; // Ensure the interface path is correct
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
  const [salesReport, setSalesReport] = useState<AdvertiserSales | null>(null);
  const [filterMonth, setFilterMonth] = useState<string>(''); // State for filtering by month
  // const advertiserId = '6748d83cda04f07884aba0fe'; // Example Advertiser ID, replace as needed

  useEffect(() => {
    loadAdvertiserSalesReport()
      .then(setSalesReport)
      .catch((error) => {
        console.error('Failed to load advertiser sales report:', error);
      });
  }, []);
  

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setFilterMonth(selectedValue); // Update filter month state
  };

  const filterByMonth = (date: string | null | undefined): boolean => {
    if (!filterMonth) {
      return true; // Include all records when no filter is selected
    }
    if (!date || date === 'N/A') {
      return false; // Exclude records with no dates or 'N/A' when a specific month is selected
    }
    const itemMonth = new Date(date).toISOString().substring(0, 7); // Extract YYYY-MM
    return itemMonth === filterMonth; // Compare with the selected filter month
  };

  // Collect unique months from activities' sold dates
  const uniqueMonthsSet = new Set<string>();

  if (salesReport) {
    salesReport.data.activities.details.forEach((activity) => {
      if (activity.soldDate) {
        const month = new Date(activity.soldDate).toISOString().substring(0, 7);
        uniqueMonthsSet.add(month);
      }
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
                      <th>Item</th>
                      <th>Sales</th>
                      <th>Revenue</th>
                      <th>Sold Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesReport ? (
                      <>
                        {/* Activities Section */}
                        <tr className="section-header">
                          <td colSpan={4} className="text-center">
                            <strong>Activities</strong>
                          </td>
                        </tr>
                        {salesReport.data.activities.details
                          .filter((activity) => {
                            // Exclude records with no dates when a specific filter is applied
                            if (filterMonth && (!activity.soldDate || activity.soldDate === 'N/A')) {
                              return false;
                            }

                            // Include all records when "All Months" is selected
                            if (!filterMonth) {
                              return true;
                            }

                            // Match specific months
                            return filterByMonth(activity.soldDate);
                          })
                          .map((activity, index) => (
                            <tr key={index} className="data-row">
                              <td>{activity.name}</td>
                              <td>{activity.sales}</td>
                              <td>
                                {activity.revenue !== null ? `$${activity.revenue}` : 'N/A'}
                              </td>
                              <td>
                                {activity.soldDate ? formatDate(activity.soldDate) : 'N/A'}
                              </td>
                            </tr>
                          ))}
                        {/* Activities Totals */}
                        <tr className="totals-row">
                          <td>
                            <strong>Total</strong>
                          </td>
                          <td>{salesReport.data.activities.totalSales}</td>
                          <td>
                            {salesReport.data.activities.totalRevenue !== null
                              ? `$${salesReport.data.activities.totalRevenue}`
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
