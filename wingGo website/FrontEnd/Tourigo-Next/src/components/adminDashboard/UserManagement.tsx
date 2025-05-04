import { useEffect, useState } from "react";
import { fetchPendingUsers, approvePendingUserById, deletePendingUserById,viewPendingUserCertificate,viewPendingUserID, fetchUsers, searchUsers, deleteUserById } from "@/api/adminApi";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faDeleteLeft, faTimes, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { imageLoader } from "@/hooks/image-loader";
import InputBox from "../shearedComponents/InputBox";
import { toast } from "sonner";

const UserManagement = () => {

  interface User {
    _id: string;
    userId: string;
    role: string;
    email: string;
    username: string;
  }

  const [allUsers, setAllUsers] = useState<User[]>([]);

  const [search, setSearch] = useState("");
  const [buttonStates, setButtonStates] = useState<{ [key: string]: "accepted" | "rejected" | "none" }>({});
  //const [documentViewed, setDocumentViewed] = useState<{ [key: string]: boolean }>({});
  
  //const [pdfUrls, setPdfUrls] = useState<{ [key: string]: string }>({});  // To store the URLs of documents

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(search === ""){
          const data = await fetchUsers();
          setAllUsers(data);
        }
        else{
          const data = await searchUsers(search);
          setAllUsers(data);
        }
      } catch (error) {
        console.error("Failed to load pending users:", error);
      }
    };
    fetchData();
  }, [search]);

  const handleSearch = async (e: any) => {
    setSearch(e.target.value);
  };




  const handleDelete = async (userId: string) => {
    const toastId = toast.loading("Deleting user...");
    try {
      
      await deleteUserById(userId);
      setAllUsers((prevUsers) => prevUsers.filter((user) => user.userId !== userId));
      setButtonStates((prevStates) => ({ ...prevStates, [userId]: "rejected" }));
      toast.success("User deleted successfully", { id: toastId });
    } catch (error) {
      console.error("Failed to reject user:", error);
      toast.error("Failed to delete user", { id: toastId });
    }
  };

  return (
    <section className="bd-team-details-area section-space position-relative">
        <div className="container">
          
    <section className="bd-recent-activity section-space-small-bottom">
      
      <div className="container" style={{ paddingTop: "0px" }}>
      <div className="section-title-wrapper section-title-space">
                <InputBox
                  placeHolder="Username"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
        <div className="row">
          <div className="col-xxl-12">
            <div className="recent-activity-wrapper">
              
              <div className="recent-activity-content">
                <div className="table-responsive" style={{ maxHeight: "373px", overflowY: "auto", scrollbarWidth: "thin", scrollbarColor: "#006CE4 #F2F2F2" }}>
                  <table className="table mb-0">
                    <tbody>
                      {allUsers.map((user) => (
                        <tr key={user.userId} className="table-custom">
                          
                          <td>
                            <div className="recent-activity-title-box d-flex align-items-center gap-10">
                              <div>
                                <h5 className="tour-title fw-5 underline">
                                  <Link href={"#"}>{user.role}</Link>
                                </h5>
                                <p className="">Username: {user.username}</p>
                              </div>
                            </div>
                          </td>
                          <td >

                            <button
                              
                              className="bd-primary-btn btn-style radius-60"
                              onClick={() => handleDelete(user.userId)}
                        
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
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

export default UserManagement;

