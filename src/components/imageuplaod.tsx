import React, { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { useUploadImage } from '../hooks/useUploadImage';  // Import the hook
import { toast } from 'react-toastify';

type ImageUploadProps = {
    bannerImage: string;
    setBannerImage: React.Dispatch<React.SetStateAction<string>>;
  };

const ImageUpload = ({ bannerImage, setBannerImage }: ImageUploadProps) => {
//   const [bannerImage, setBannerImage] = useState<string>('');  // Holds the image URL after upload
  const { uploadImage, mutation } = useUploadImage(setBannerImage);  // Use the custom hook

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];  // Get the selected file
    if (file) {
      const formData = new FormData();  // Create FormData to send the file
      formData.append('Banner', file);  // Append the image file to the FormData object

      try {
        // Call the uploadImage function from the custom hook and upload the file
        await uploadImage(formData);
      } catch (error) {
        toast.error('Error uploading the image');
      }
    }
  };

  const handleRemoveImage = () => {
    setBannerImage('');  // Remove the image
  };

  return (
    <section className="mt-[0.5rem]">
      <div className="w-full h-[15rem] lg:h-[20rem] bg-gradient-to-r from-[#45F882] to-[#FFBE18] rounded-[1.5rem] p-[0.1rem]">
        <div className="bg-[#0B0D13] rounded-[1.5rem] w-full h-full flex justify-center items-center">
          {bannerImage ? (
            <div className="w-full h-full flex justify-center items-center rounded-[1.5rem] relative">
              <img
                src={bannerImage}
                alt="Banner Preview"
                className="max-w-full max-h-full object-contain rounded-[1.5rem] shadow-lg"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full hover:bg-red-700"
              >
                <IoIosCloseCircle className="h-6 w-6" />
              </button>
            </div>
          ) : (
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full rounded-[1.5rem] cursor-pointer bg-[#1A1D26]">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <img
                  src="/create-tournament/file_upload.png"
                  alt="Upload"
                  className="h-[5rem] w-[5rem] lg:h-[10rem] lg:w-[10rem]"
                />
                <p className="text-center text-white text-[1rem] md:text-[1.875rem]">
                  440*255 <span className="text-[#45F882]">Below 1 MB</span>
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}  // Handle file change
              />
            </label>
          )}
        </div>
      </div>
      {/* Error handling (if any) can be added here */}
    </section>
  );
};

export default ImageUpload;
