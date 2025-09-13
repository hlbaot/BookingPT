'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ImageUploadBox from './imgUpload';
import axios from 'axios';
import { useEffect, useState } from 'react';

type ModalPackageProps = {
  open: boolean;
  handleClose: () => void;
  data: {
    id: number;
    name: string;
    price: number;
    description: string;
  };
};

export default function ModalPackage({ open, handleClose, data }: ModalPackageProps) {
  const [images, setImages] = useState<string[]>([]);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`/api/package/${data.id}/images`);
      setImages(res.data.images || []); 
    } catch (err) {
      console.error("Không load được ảnh:", err);
    }
  };

  useEffect(() => {
    if (open) fetchImages();
  }, [open]);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 800,
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: 4,
    boxShadow: 24,
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ zIndex: 1000 }}>
      <Box sx={style}>
        <h1 className="text-2xl text-center font-semibold mb-4 text-gray-800">Thông tin gói</h1>
        <div className="space-y-2 text-base text-gray-700 mb-6">
          <p><strong>Tên gói:</strong> {data.name}</p>
          <p><strong>Giá:</strong> {data.price.toLocaleString()} VNĐ</p>
          <p><strong>Mô tả:</strong> {data.description}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          {[0, 1, 2].map((i) => (
            <ImageUploadBox
              key={i}
              index={i}
              imageUrl={images[i] || null}
              onDeleted={fetchImages}
            />
          ))}
        </div>
      </Box>
    </Modal>
  );
}
