import React, { useState, ChangeEvent } from "react";
import Image from "next/image";

interface FilePreviewProps {
  imageSrc: string;
  fileName: string;
  fileSize: string;
  onRemove: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  imageSrc,
  fileName,
  fileSize,
  onRemove,
}) => (
  <div className="dz-preview dz-image-preview">
    <div className="dz-image">
      <Image
        src={imageSrc}
        alt="image"
        layout="responsive"
        width={100}
        height={300}
      />
    </div>
    <div className="dz-details">
      <div className="dz-size">
        <span data-dz-size="">
          <strong>{fileSize}</strong> MB
        </span>
      </div>
      <div className="dz-filename">
        <span data-dz-name="">{fileName}</span>
      </div>
    </div>
    <div className="dz-progress">
      <span className="dz-upload" data-dz-uploadprogress=""></span>
    </div>
    <div className="dz-error-message">
      <span data-dz-errormessage=""></span>
    </div>

    <button
      className="dz-remove remove-btn text-center"
      type="button"
      data-dz-remove=""
      onClick={onRemove}
    >
      Remove file
    </button>
  </div>
);

interface File {
  src: string;
  name: string;
  size: string;
}

const TourGallery: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []).map((file) => {
      const src = URL.createObjectURL(file);
      const size = (file.size / (1024 * 1024)).toFixed(2);
      return { src, name: file.name, size };
    });

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleClick = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <div className="tour-gallery-dropzone">
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div className="dropzone dz-clickable dz-started" id="myDropzone">
        <div className="dz-default dz-message" onClick={handleClick}>
          <span>Upload your file here</span>
        </div>
        {files.map((file, index) => (
          <FilePreview
            key={index}
            imageSrc={file.src}
            fileName={file.name}
            fileSize={file.size}
            onRemove={() => handleRemoveFile(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TourGallery;
