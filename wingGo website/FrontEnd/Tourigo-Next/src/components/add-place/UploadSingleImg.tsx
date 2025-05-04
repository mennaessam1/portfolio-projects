import React, { useState } from "react";
import bgImg from "../../../public/assets/images/tour/tour-img-1.png";

interface propsType {
  setlargeImg: React.Dispatch<React.SetStateAction<string>>;
}
const UploadSingleImg = ({ setlargeImg }: propsType) => {
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
            <label htmlFor="imageUpload">Click images here</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadSingleImg;
