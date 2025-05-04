import { redeemPoints } from '@/api/LoyaltyApi';
import { addPreferencesToTourist, deletePreferenceFromTourist, getAllPreferenceTags, toggleNotificationPreferenceApi, getTouristNotificationsApi  } from '@/api/PrefrenceApi';
import CountUpContent from '@/elements/counter/CountUpContent';
import React, { useState, useEffect } from 'react';
import { FaWallet } from "react-icons/fa";
import { toast } from 'sonner';
import {Notification} from '@/interFace/interFace'
import { FaBell } from "react-icons/fa";


interface Props {
  profileData: any,
  id: string,
  setPrefrenceRefresh: any
  }
const Prefrences: React.FC<Props> = ({profileData, id, setPrefrenceRefresh}) => {

    const [availablePrefrences, setAvailablePrefrences] = useState<Array<any>>([]);
    const [selectedPrefrences, setSelectedPrefrences] = useState<Array<any>>(profileData?.preferences);
    const [notifyOnInterest, setNotifyOnInterest] = useState<boolean>(profileData?.notifyOnInterest || false); // Add local state
    const [notifications, setNotifications] = useState<Notification[]>([]); // Using the interface
    const [loading, setLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false); 

    console.log('Selected Preferences:', selectedPrefrences);
    
   

    useEffect(() => {
      const fetchAllPreferenceTags = async () => {
        try {
          const data = await getAllPreferenceTags();
          console.log('Tags available:', data);
          setAvailablePrefrences(data);
        } catch (error) {
          console.error('Error fetching Tags:', error);
        }
      };

  
      fetchAllPreferenceTags();
      
    }, []);

    const updatePreferences = async (itemID: string) => {
      try {
        
        console.log('pref tag id:', itemID);
        const response = await addPreferencesToTourist(id, itemID);
        
        setPrefrenceRefresh(true);
      } catch (error) {
        console.error('Error adding preferences:', error);
      }
    };

    const deletePreferences = async (itemID: string) => {
      try {
        console.log('pref tag id:', itemID);
        const response = await deletePreferenceFromTourist(id, itemID);
        setPrefrenceRefresh(true);
      } catch (error) {
        console.error('Error adding preferences:', error);
      }
    }

  const handleSelectPrefClick = (id: any) => {
    if(selectedPrefrences?.includes(id)){
      const index = selectedPrefrences?.indexOf(id);
      if (index > -1) {
        selectedPrefrences?.splice(index, 1);
      }
      setSelectedPrefrences([...selectedPrefrences]);
      deletePreferences(id);
    }else{
      setSelectedPrefrences([...selectedPrefrences, id]);
      updatePreferences(id);
    }
  }
    
  const handleToggleNotification = async () => {
    try {
      const updatedPreference = !notifyOnInterest;
      setNotifyOnInterest(updatedPreference); // Optimistic update
      await toggleNotificationPreferenceApi(updatedPreference);
      toast.success(`Notifications ${updatedPreference ? 'enabled' : 'disabled'} successfully!`);
    } catch (error) {
      setNotifyOnInterest((prev) => !prev); // Revert state if API fails
      toast.error('Failed to update notification preference. Please try again.');
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getTouristNotificationsApi();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [id]);

  const handleBellClick = () => {
    setShowDropdown((prev) => !prev); // Toggle dropdown visibility
  };

  return (
    <section className="bd-team-details-area section-space position-relative">
        <h2 className="team-single-title">Preferences</h2>

      {/* Bell Icon for Notifications */}
<div
  style={{
    position: "absolute", // Position relative to the screen
    top: "20px", // Adjust vertical positioning
    right: "20px", // Adjust horizontal positioning
  }}
>
  <FaBell
    style={{
      fontSize: "32px", // Make the bell larger
      cursor: "pointer",
      color: "#006ce4",
    }}
    onClick={handleBellClick}
  />
  {notifications.length > 0 && (
    <span
      style={{
        position: "absolute",
        top: "-5px", // Adjust position to place the circle on the bell
        right: "-5px",
        background: "red",
        color: "white",
        borderRadius: "50%",
        fontSize: "14px", // Slightly larger text
        width: "20px", // Adjust width
        height: "20px", // Adjust height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {notifications.length}
    </span>
  )}
  {showDropdown && (
    <div
      style={{
        position: "absolute",
        top: "40px", // Dropdown below the bell icon
        right: "0",
        background: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        width: "300px",
        padding: "10px",
        zIndex: 1000,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        maxHeight: "200px", // Set a fixed height
        overflowY: "auto", // Enable scrolling
      }}
    >
      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length > 0 ? (
        <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
          {notifications.map((notification) => (
            <li
              key={notification._id}
              style={{
                marginBottom: "10px",
                padding: "8px",
                borderBottom: "1px solid #eee",
              }}
            >
              {notification.message}
              <br />
              <small style={{ color: "#888" }}>
                {new Date(notification.date).toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications yet.</p>
      )}
    </div>
  )}
</div>


        {/* Notification Preference Toggle */}
        <div className="notification-toggle mb-20" style={{ display: 'flex', alignItems: 'center', paddingTop:"20px" }}>
          <input
            type="checkbox"
            checked={notifyOnInterest}
            onChange={handleToggleNotification}
            className="notification-toggle-input"
            style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              marginRight: '10px', // Add space between checkbox and text
              cursor: 'pointer',
            }}
          />
        
            Receive Notifications for Saved Events

        </div>

       
      <div className="buttons-container-pref">
        
        {availablePrefrences.map((item) => (
          <button
            onClick={() => handleSelectPrefClick(item._id)}
            className={`button-pref ${
              selectedPrefrences?.includes(item._id) ? "active-pref" : ""
            }`}
            key={item._id}
          >
            {item.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Prefrences;