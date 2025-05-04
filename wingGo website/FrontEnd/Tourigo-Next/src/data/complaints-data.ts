import{fetchComplaints, fetchTouristComplaints} from '@/api/complaintsApi';
//import{fetchAllComplaints}from'@/api/complaintsApi';
import{Complaint}from'../interFace/interFace';


export const getComplaintsData=async():Promise<Complaint[]>=>{
    try{
        const complaints=await fetchComplaints();
        return complaints;
    }catch(error){
        console.error("Error loading complaints:",error);
        return[];
    }
};


export const getComplaintsDataTourist=async():Promise<Complaint[]>=>{
    try{
        const complaints=await fetchTouristComplaints();
        return complaints;
    }catch(error){
        console.error("Error loading complaints:",error);
        return[];
    }
};

//file complaints 
export const fileComplaint=async(touristId:string,complaintData:Omit<Complaint,"_id"|"tourist"|"state"|"reply">)=>{
    try{
        await fileComplaint(touristId,complaintData);
    }catch(error){
        console.error("Error filing complaint:",error);
        throw error;
    }
};
