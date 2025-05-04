'use client';
import { loadTouristReportofguide } from '@/data/sales-report'; 
import { TouristReportOfGuide } from '@/interFace/interFace'; 
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
  const [touristReport, setTouristReport] = useState<TouristReportOfGuide | null>(null);
  const [filterMonth, setFilterMonth] = useState<string>(''); 
  // const tourGuideId = '67244655313a2a345110c1e6'; 

  useEffect(() => {
    loadTouristReportofguide()
      .then(setTouristReport)
      .catch((error) => {
        console.error('Failed to load tourist report:', error);
      });
  }, []);
  

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setFilterMonth(selectedValue); 
  };

  const filterByMonth = (date: string | null | undefined): boolean => {
    if (!filterMonth) {
      return true; 
    }
    if (!date) {
      return false; 
    }
    const itemMonth = new Date(date).toISOString().substring(0, 7); 
    return itemMonth === filterMonth; 
  };

  const uniqueMonthsSet = new Set<string>();
  if (touristReport) {
    touristReport.data.itineraries.details.forEach((itinerary) => {
      itinerary.details.forEach((detail) => {
        const month = new Date(detail.bookingDate).toISOString().substring(0, 7);
        uniqueMonthsSet.add(month);
      });
    });
  }
  const uniqueMonths = Array.from(uniqueMonthsSet).sort((a, b) => a.localeCompare(b));

  const filteredItineraries = touristReport?.data.itineraries.details.filter((itinerary) =>
    itinerary.details.some((detail) => filterByMonth(detail.bookingDate))
  );

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
                      <th>Itinerary Name</th>
                      <th>Total Tourists</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItineraries && filteredItineraries.length > 0 ? (
                      <>
                        {filteredItineraries.map((itinerary, index) => (
                          <tr key={index} className="data-row">
                            <td>{itinerary.name}</td>
                            <td>{itinerary.totalTourists}</td>
                            <td>
                              {itinerary.details
                                .filter((detail) => filterByMonth(detail.bookingDate))
                                .map((detail, idx) => (
                                  <div key={idx}>
                                    <strong>Tourist ID:</strong> {detail.touristId}, 
                                    <strong> Booking Date:</strong> {formatDate(detail.bookingDate)}, 
                                    <strong> People:</strong> {detail.numberOfPeople}
                                  </div>
                                ))}
                            </td>
                          </tr>
                        ))}
                        <tr className="totals-row">
                          <td><strong>Total Tourists</strong></td>
                          <td>{touristReport?.data.itineraries.totalTourists}</td>
                          <td></td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center">
                          <strong>No Results Found</strong>
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

      <style jsx>{`
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
          padding: 8px 12px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .filter-select:hover {
          border-color: #007bff;
        }

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
          background-color: #032040 !important; 
          color: white !important; 
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default RecentActivity;
