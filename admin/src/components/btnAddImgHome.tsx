'use client';
import { useRef } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from '@/api/API_cloudinary';

interface ButtonAddProps {
  onImageUpload: (img: { url: string; public_id: string }) => void;
}

const ButtonAddImg: React.FC<ButtonAddProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    else console.log('File đã chọn:', file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
      if(response) {
        console.log('Upload thành công', response.data);

      Swal.fire({
        title: "Thành công",
        text: "Upload ảnh thành công!",
        icon: "success",
        timer: 2000,
      });
      }
      else console.error('Upload thất bại', response);



    } catch (error) {
      console.error('Upload thất bại', error);
      Swal.fire({
        title: "Lỗi",
        text: "Upload ảnh thất bại!",
        icon: "error",
      });
    }
  };

  return (
    <>
      <button
        className='w-[40px] h-[40px] bg-yellow-500 rounded-[50%] text-[25px] hover:bg-yellow-700'
        type="button"
        onClick={() => fileInputRef.current?.click()}
      >
        +
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};

export default ButtonAddImg;
