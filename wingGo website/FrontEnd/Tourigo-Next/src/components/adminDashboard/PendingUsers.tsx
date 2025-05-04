import { useEffect, useState } from "react";
import { IPendingUser } from "@/interFace/interFace";
import { fetchPendingUsers, approvePendingUserById, deletePendingUserById,viewPendingUserCertificate,viewPendingUserID } from "@/api/adminApi";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { imageLoader } from "@/hooks/image-loader";

const PendingUsers = () => {
  const [pendingUsers, setPendingUsers] = useState<IPendingUser[]>([]);
  const [buttonStates, setButtonStates] = useState<{ [key: string]: "accepted" | "rejected" | "none" }>({});
  const [documentViewed, setDocumentViewed] = useState<{ [key: string]: boolean }>({});
  
  const [pdfUrls, setPdfUrls] = useState<{ [key: string]: string }>({});  // To store the URLs of documents

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPendingUsers();
        setPendingUsers(data);
      } catch (error) {
        console.error("Failed to load pending users:", error);
      }
    };
    fetchData();
  }, []);

  const handleViewCertificate = async (id: string) => {
    try {
      // Call the API to fetch the pre-signed URL for the document
      const response = await viewPendingUserCertificate(id);
      if (response && response.preSignedUrl) {
        // Set the PDF URL and mark the document as viewed
        setPdfUrls((prev) => ({ ...prev, [id]: response.preSignedUrl }));
        setDocumentViewed((prev) => ({ ...prev, [id]: true }));
        // Optionally, you can open the document in a new window
        window.open(response.preSignedUrl, "_blank");
      }
    } catch (error) {
      console.error("Error fetching document URL:", error);
      alert("Failed to load document.");
    }
  };
  const handleViewId = async (id: string) => {
    try {
      const response = await viewPendingUserID(id);
      if (response && response.preSignedUrl) {
        window.open(response.preSignedUrl, "_blank");
      }
    } catch (error) {
      console.error("Error fetching ID document:", error);
      alert("Failed to load ID document.");
    }
  };


  const handleAccept = async (id: string) => {
    const confirmAccept = window.confirm("Are you sure you want to approve this user?");
    if (!confirmAccept) return;

    try {
      await approvePendingUserById(id);
      setPendingUsers((prev) => prev.filter((user) => user._id !== id));
      setButtonStates((prev) => ({ ...prev, [id]: "accepted" }));
      alert("User has been approved successfully.");
    } catch (error) {
      console.error(`Error approving user with ID ${id}:`, error);
    }
  };

  const handleReject = async (id: string) => {
    const confirmReject = window.confirm("Are you sure you want to reject this user?");
    if (!confirmReject) return;

    try {
      await deletePendingUserById(id);
      setPendingUsers((prev) => prev.filter((user) => user._id !== id));
      setButtonStates((prev) => ({ ...prev, [id]: "rejected" }));
      alert("User has been rejected successfully.");
    } catch (error) {
      console.error(`Error rejecting user with ID ${id}:`, error);
    }
  };

  return (
    <section className="bd-team-details-area section-space position-relative">
        <div className="container">
    <section className="bd-recent-activity section-space-small-bottom">
      <div className="container" style={{ paddingTop: "0px" }}>
        <div className="row">
          <div className="col-xxl-12">
            <div className="recent-activity-wrapper">
              <div className="section-title-wrapper section-title-space">
                <h2 className="section-title">Pending Users</h2>
              </div>
              <div className="recent-activity-content">
                <div className="table-responsive" style={{ maxHeight: "373px", overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "#006CE4 #F2F2F2" }}>
                  <table className="table mb-0">
                    <tbody>
                      {pendingUsers.map((booking) => (
                        <tr key={booking._id} className="table-custom">
                          <td>
                            <div className="dashboard-thumb-wrapper p-relative">
                              <div className="dashboard-thumb image-hover-effect-two position-relative">
                                <Image src="" loader={imageLoader} style={{ width: "100%", height: "auto" }} alt="image" />
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="recent-activity-title-box d-flex align-items-center gap-10">
                              <div>
                                <h5 className="tour-title fw-5 underline">
                                  <Link href={`/details/${booking._id}`}>{booking.role}</Link>
                                </h5>
                                <div className="recent-activity-location">Email: {booking.email}</div>
                                <p className="">Username: {booking.username}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                          <div className="d-flex align-items-center gap-10">
                          <button
                              className="bd-primary-btn btn-style radius-60"
                              onClick={() => handleViewCertificate(booking._id)}
                            >
                              View Certificate
                            </button>
                            <button
                              className="bd-primary-btn btn-style radius-60"
                              style={{ marginLeft: "5px" }}
                              onClick={() => handleViewId(booking._id)}
                            >
                              View ID
                            </button>

                            <button
                              onClick={() => handleAccept(booking._id)}
                              className="bd-primary-btn btn-style radius-60"
                              style={{
                                marginLeft: "5px",
                              }
                              }
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </button>


                            <button
                              onClick={() => handleReject(booking._id)}
                              className="bd-primary-btn btn-style radius-60"
                              style={{
                                marginLeft: "5px",
                              }
                              }
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
    </section>
  );
};

export default PendingUsers;

