"use client";
import React, { useState,useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { addDeliveryAddresses ,fetchDeliveryAddresses} from "@/api/cartApi"; // Import your API function

interface FormData {
  fName: string;
  lName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  addressTwo: string;
  city: string;
  zip: string;
  phone: string;
  email: string;
  note: string;
}
interface CheckoutMainProps {
  promoCode: string | null; // Accept promoCode as a prop
  // orderId:string | null
}

const CheckoutForm: React.FC<CheckoutMainProps> = ({ promoCode}) => {
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState<string>("");
  const [deliveryAddresses, setDeliveryAddresses] = useState<string[]>([]); 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const toastId = toast.loading("");
    toast.success("Message Sent Successfully", { id: toastId, duration: 1000 });
    reset();
  };
  // Fetch delivery addresses when the component loads
  useEffect(() => {
    const loadDeliveryAddresses = async () => {
      try {
        const addresses = await fetchDeliveryAddresses();
        setDeliveryAddresses(addresses); // Set the fetched addresses
      } catch (error: any) {
        toast.error(error.message || "Failed to load delivery addresses.");
      }
    };

    loadDeliveryAddresses();
  }, []);

  const handleAddNewAddress = async () => {
    if (!newAddress.trim()) {
      toast.error("Address cannot be empty.");
      return;
    }

    try {
      const response = await addDeliveryAddresses([newAddress]);
      toast.success(response.message);
      setDeliveryAddresses(response.deliveryAddresses); // Update addresses state
      
      setShowAddressForm(false);
      setNewAddress(""); // Clear the input
      setSelectedAddress(newAddress); // Clear the input
    } catch (error: any) {
      toast.error(error.message || "Failed to add address.");
    }
  };


  return (
    <>
      <div className="sidebar-widget widget">
        {/* Choose Delivery Address */}
        <div className="d-flex justify-content-between align-items-center mb-15">
          <h6 className="sidebar-widget-title small">Choose Delivery Address</h6>
          <button
            onClick={() => setShowAddressForm(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              color: "#495057",
            }}
          >
            <span>➕</span>
          </button>
        </div>

       
        {/* Dropdown for selecting address */}
        <select
          className="sidebar-select"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ced4da",
            fontSize: "16px",
            color: "#495057",
            backgroundColor: "#fff",
            marginBottom: "15px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23999999' d='M2 0L0 2h4zM2 5L0 3h4z'/></svg>")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
            backgroundSize: "10px",
          }}
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)} // Update selected address
        
        >
          <option value="">Select Address</option>
          {deliveryAddresses.map((address, index) => (
            <option key={index} value={address}>
              {address}
            </option>
          ))}
          {/* Add more address options as needed */}
        </select>

        {/* Address Form Modal */}
        {showAddressForm && (
          <>
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                zIndex: 1000,
              }}
            >
              <h5>Add New Address</h5>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddNewAddress();
                }}
              >
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter your address"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save Address
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ marginLeft: "10px" }}
                  onClick={() => setShowAddressForm(false)}
                >
                  Cancel
                </button>
              </form>
            </div>

            {/* Overlay */}
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
              }}
              onClick={() => setShowAddressForm(false)}
            ></div>
          </>
        )}
      </div>

      
        
        <div className="sidebar-widget-divider"></div>
        <div className="sidebar-widget widget">
          {/* <h6 className="sidebar-widget-title small mb-15">Price Filter</h6> */}
          <h6 className="sidebar-widget-title small mb-15">Shipping to address:<span>{selectedAddress || "No address selected"}</span></h6>
        </div>
        

      {/* Order Notes */}
      {/* <div className="sidebar-widget-divider"> */}
      <div className="sidebar-widget-divider"></div>
        <div className="sidebar-widget widget">
      <div className="col-md-12">
        <div className="checkout-input">
          <label>Order notes (optional)</label>
          <textarea
            placeholder="Notes about your order, e.g. special notes for delivery."
            {...register("note")}
          ></textarea>
        </div>
      </div>
      </div>
       
      {/* </div> */}
    </>
  );
};

export default CheckoutForm;
