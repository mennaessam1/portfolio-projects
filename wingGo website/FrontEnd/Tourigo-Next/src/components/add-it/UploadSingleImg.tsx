import React, { useState } from "react";
import bgImg from "../../../public/assets/images/noImage.png";

interface propsType {
  setlargeImg: React.Dispatch<React.SetStateAction<string>>;
  setImage: React.Dispatch<React.SetStateAction<File|null>> ;
}
const UploadSingleImg = ({ setlargeImg ,setImage}: propsType) => {
  const [imagePreview, setImagePreview] = useState<string>(bgImg.src);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
          setlargeImg(reader.result);
        }
        if (e.target.files && e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="tour-details-thumb details-slide-full mb-30">
        <div className="tour-thumb-chnage">
          <div className="tour-thumb-preview">
            <div
              className="tour-thumb-preview-box"
              id="imagePreview"
              style={{ backgroundImage: `url(${imagePreview})` }}
            ></div>
          </div>
          <div className="tour-thumb-edit">
            <input
              type="file"
              id="imageUpload"
              accept=".png, .jpg, .jpeg"
              onChange={handleImageChange}
            />
            <label htmlFor="imageUpload">Upload Image</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadSingleImg;
