'use client';
import { loadTouristReportofAdvertiser } from '@/data/sales-report'; // Ensure the correct path is used
import { TouristReportOfAdvertiser } from '@/interFace/interFace'; // Ensure the interface path is correct
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
  const [touristReport, setTouristReport] = useState<TouristReportOfAdvertiser | null>(null);
  const [filterMonth, setFilterMonth] = useState<string>(''); // State for filtering by month
  // const advertiserId = '66fb37dda63c04def29f944e'; // Example Advertiser ID, replace as needed

  useEffect(() => {
    loadTouristReportofAdvertiser()
      .then(setTouristReport)
      .catch((error) => {
        console.error('Failed to load advertiser tourist report:', error);
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

  // Collect unique months from activities' details sold dates
  const uniqueMonthsSet = new Set<string>();

  if (touristReport) {
    touristReport.data.activities.details.forEach((activity) => {
      activity.details.forEach((detail) => {
        const month = new Date(detail.soldDate).toISOString().substring(0, 7);
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
                      <th>Activity Name</th>
                      <th>Total Tourists</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {touristReport ? (
                      <>
                        {touristReport.data.activities.details
                          .filter((activity) => {
                            // Filter activities based on details' sold dates
                            const filteredDetails = activity.details.filter((detail) =>
                              filterByMonth(detail.soldDate)
                            );
                            return filterMonth ? filteredDetails.length > 0 : true;
                          })
                          .map((activity, index) => (
                            <tr key={index} className="data-row">
                              <td>{activity.name}</td>
                              <td>{activity.totalTourists}</td>
                              <td>
                                {activity.details
                                  .filter((detail) => filterByMonth(detail.soldDate))
                                  .map((detail, idx) => (
                                    <div key={idx}>
                                      <strong>People:</strong> {detail.numberOfPeople},{' '}
                                      <strong>Date:</strong> {formatDate(detail.soldDate)}
                                    </div>
                                  ))}
                              </td>
                            </tr>
                          ))}
                        {/* Totals */}
                        <tr className="totals-row">
                          <td>
                            <strong>Total Tourists</strong>
                          </td>
                          <td>{touristReport.data.activities.totalTourists}</td>
                          <td></td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center">
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

        .custom-table .data-row:hover {
          background-color: #f9f9f9;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .custom-table .totals-row {
          background-color: #032040 !important; /* Black background */
          color: white !important; /* White text */
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
