'use client';
import Swal from "sweetalert2";
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL } from "@/api/API_cloudinary";
import axios from "axios";

type Props = {
  index: number;
  imageUrl: string | null;
  onDeleted: () => void;
};

function ImageUploadBox({ index, imageUrl, onDeleted }: Props) {
  const uniqueId = `photo-upload-${index}`;

 //uplaod lên cloudinary và gửi json ảnh về be
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);

      if (response) {
        const imageUrl = response.data.secure_url;
        // console.log('Upload thành công:', imageUrl);
        // gửi ảnh về BE thông qua api
        await axios.post("http://localhost:5000/api/posts", {
          imageUrl: imageUrl,
        });

        Swal.fire({
          title: "Thành công",
          text: "Upload ảnh thành công!",
          icon: "success",
          timer: 2000,
        });
      }
      else console.error('Upload thất bại', response);
    } catch (err) {
      console.error("Upload thất bại:", err);
      Swal.fire("Lỗi", "Không thể upload ảnh", "error");
    }
  };

  // gọi API BE để xóa
  const handleRemove = async () => {
    if (!imageUrl) return;

    const confirm = await Swal.fire({
      title: "Bạn có chắc muốn xóa ảnh này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#d1d5db",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`/api/delete-image`, {
          data: { imageUrl },
        });

        Swal.fire("Đã xóa ảnh!", "", "success");
        onDeleted(); // reload ảnh từ BE
      } catch (err) {
        console.error("Xóa ảnh thất bại:", err);
        Swal.fire("Lỗi", "Không thể xóa ảnh", "error");
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md w-40 h-40 flex items-center justify-center relative overflow-hidden">
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-xl"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-white rounded-full text-black text-sm w-6 h-6 flex items-center justify-center hover:bg-red-500 hover:text-white"
          >
            ×
          </button>
        </>
      ) : (
        <div className="text-center">
          <label
            htmlFor={uniqueId}
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 text-sm"
          >
            Tải ảnh lên
          </label>
          <input
            type="file"
            id={uniqueId}
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUploadBox;
