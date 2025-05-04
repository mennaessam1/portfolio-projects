import { addActCategory, updateActCategories, deleteActCategory, getAllActCategories } from '@/api/adminApi';
import { redeemPoints } from '@/api/LoyaltyApi';
import CountUpContent from '@/elements/counter/CountUpContent';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { set } from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaSave, FaWallet } from "react-icons/fa";



const ActivityCategories = () => {

    const [availablePrefrences, setAvailablePrefrences] = useState<Array<any>>([]);
    const [isEdit, setIsEdit] = useState<{ [key:string]: boolean }>({});
    const [newName, setNewName] = useState<{ [key: string]: string}>({});

    const [addTag, setAddTag] = useState<string>('');


    
    useEffect(() => {
      const fetchAllActCategories = async () => {
        try {
          const data = await getAllActCategories();
          console.log('Tags available:', data);
          setAvailablePrefrences(data);
        } catch (error) {
          console.error('Error fetching Tags:', error);
        }
      };

      
  
      fetchAllActCategories();
      
    } , []);

    const handleEditClick = (id: string) => {
      setIsEdit((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    
    const handleNameChange = (id: string, value: string) => {
      setNewName((prev) => ({ ...prev, [id]: value }));
    };

    const handleSaveClick = async (id: string) => {
      try {
        await updateActCategories(id, newName[id]);
        setIsEdit((prev) => ({ ...prev, [id]: false }));
        
        // Refresh the preferences list
        const data = await getAllActCategories();
        setAvailablePrefrences(data);
      } catch (error) {
        console.error('Error updating preference:', error);
      }
    };

    const handleDeleteClick = async (id: string) => {
      try {
        await deleteActCategory(id);
        // Refresh the preferences list
        const data = await getAllActCategories();
        setAvailablePrefrences(data);
      } catch (error) {
        console.error('Error deleting preference:', error);
      }
    };

    const handleAddClick = async () => {
      try {
        await addActCategory(addTag);
        // Refresh the preferences list
        const data = await getAllActCategories();
        setAvailablePrefrences(data);
        setAddTag('');
      } catch (error) {
        console.error('Error adding preference:', error);
      }
    };
    

  

  

  return (
    <section className="bd-team-details-area section-space position-relative">
        <h2 className="team-single-title mb-20">Activity Categories</h2>

        <div className="buttons-container-pref">
        {availablePrefrences.map((preference) => (
          <div className="button-pref-admin" key={preference._id}>
            {isEdit[preference._id] ? (
              <input
                type="text"
                className='w-auto'
                value={newName[preference._id] || preference.name}
                onChange={(e) => handleNameChange(preference._id, e.target.value)}
              />
            ) : (
              <span>{preference.name}</span>
            )}
            <button onClick={() => handleEditClick(preference._id)}>
              <FaEdit />
            </button>
            {isEdit[preference._id] && (
              <button className='' onClick={() => handleSaveClick(preference._id)}>
                <FaSave />
              </button>
            )}
             <button onClick={() => handleDeleteClick(preference._id)}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
          
        ))}
      </div>


      <div className="flex g-10 items-left justify-left mt-150">
        <input
          type="text"
          className='w-auto flex g-10'
          placeholder="Add new activity category"
          value={addTag}
          onChange={(e) => setAddTag(e.target.value)}
        />
        <button 
        className='bd-primary-btn btn-style radius-60' 
        style={{ marginLeft: "20px" }}
        onClick={() => handleAddClick()} > 
        Add Activity Category
        </button>
      </div>


    </section>
  );
};

export default ActivityCategories;