//TourDetailsPostForm.tsx
import GetRatting from "@/hooks/GetRatting";
import React from "react";
import { Complaint } from "@/interFace/interFace";
import axios from "axios";
import { useState } from "react";

interface TourDetailsPostFormProps {
  complaintId: string;
  onReplyPosted: (reply: string) => void;
}
const TourDetailsPostForm: React.FC<TourDetailsPostFormProps> = ({ complaintId, onReplyPosted }) => {
  const [replyText, setReplyText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handlePostComment = async () => {
    if (!replyText) return;
    try {
      await axios.post(`http://localhost:8000/admin/replytocomplaint/${complaintId}`, {
        reply: replyText,
      });
      onReplyPosted(replyText); // Notify parent component with new reply
      setReplyText(""); // Clear input
      setShowPopup(true);

      // Hide the pop-up after 3 seconds
      setTimeout(() => setShowPopup(false), 3000);

    } catch (error) {
      console.error("Failed to post reply:", error);
    }
  };
  
  return (
    <div className="post-comment-form">
      <div className="post-comments-title">
        <h4 className="mb-15">Admin Reply</h4>
      </div>
      <form>
        <div className="row gy-24">
          <div className="col-xl-12">
            <div className="input-box">
              <textarea
                cols={30}
                rows={10}
                placeholder="Type Comment here"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)} // Bind input to state
              ></textarea>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="submit-btn">
              <button
                type="button"
                className="bd-primary-btn btn-style has-arrow is-bg radius-60"
                onClick={handlePostComment} // Trigger handlePostComment
              >
                <span className="bd-primary-btn-arrow arrow-right">
                  <i className="fa-regular fa-arrow-right"></i>
                </span>
                <span className="bd-primary-btn-text">Post Comment</span>
                <span className="bd-primary-btn-circle"></span>
                <span className="bd-primary-btn-arrow arrow-left">
                  <i className="fa-regular fa-arrow-right"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>

       {/* Pop-up message */}
       {showPopup && (
        <div className="popup-message">
          <p>Reply posted successfully!</p>
        </div>
      )}
    </div>
  );
};

export default TourDetailsPostForm;

