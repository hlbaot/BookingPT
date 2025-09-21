'use client';
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Toast from 'typescript-toastify';
import "../styles/Modal.scss";
import { API_SubmitBooking } from "@/api/API_SubmitPackage";
import Cookies from "js-cookie";

interface CustomModalProps {
  open: boolean;
  handleClose: () => void;
  serviceData?: Package | null;
}

export default function CustomModal({ open, handleClose, serviceData }: CustomModalProps) {
  if (!serviceData) return null;

  const { name, description, price, imageUrls } = serviceData;
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (serviceData) {
      setSelectedImage(serviceData.imageUrls[0]);
    }
  }, [serviceData]);

  const validationSchema = Yup.object({
    date: Yup.string().required("Required"),
    time: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    note: Yup.string(),
  });

  //get email từ cookies
  const email = Cookies.get("email");

  //lấy ngày hiện tại
  const today = new Date().toISOString().split("T")[0]; // yyyy-MM-dd

  return (
    <section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box bg-white rounded-lg w-[90%] max-w-[1000px] p-4">
          <div className="modal-content flex flex-row h-full gap-4">
            {/* Left */}
            <div className="left w-[65%] h-full flex flex-col gap-2">
              <div className="main-image-container flex flex-col-reverse md:flex-row items-center gap-2 h-[70%]">
                <img
                  className="main-image w-[50%] h-[350px] rounded-lg object-cover"
                  src={selectedImage}
                  alt="Main package"
                />
                <div className="package-info flex-1 text-center text-black">
                  <h3 className="text-xl font-medium mb-1">{serviceData.name}</h3>
                  <p className="text-black text-base mb-1">{serviceData.description}</p>
                  <p className="text-black text-base">
                    Giá từ <span className="text-black">{serviceData.price}</span> VNĐ
                  </p>
                </div>
              </div>

              <div className="thumbnail-container flex gap-4 flex-nowrap overflow-x-auto h-[30%]">
                {imageUrls.map((image, index) => (
                  <img
                    className={`w-[100px] h-[100px] rounded-md object-cover cursor-pointer transition-transform ${selectedImage === image ? "border-2 border-blue-500 scale-105" : ""
                      }`}
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index}`}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="right w-[35%] h-full p-2">
              <Formik
                initialValues={{
                  email: email || "",
                  bookTime: "",
                  time: "",
                  location: "",
                  message: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values: FormBooking, { resetForm }) => {
                  const token = Cookies.get("token");
                  if (!token) {
                    new Toast({
                      position: "top-right",
                      toastMsg: "Vui lòng đăng nhập để đặt lịch!",
                      autoCloseTime: 1500,
                      canClose: true,
                      showProgress: true,
                      pauseOnHover: true,
                      pauseOnFocusLoss: true,
                      type: "error",
                      theme: "light",
                    });
                    // alert("Vui lòng đăng nhập để đặt lịch!");
                    return;
                  }

                  try {
                    if (!serviceData) return; // đảm bảo có dữ liệu
                    const res = await API_SubmitBooking(values, token, serviceData.id);
                    new Toast({
                      position: "top-right",
                      toastMsg: "Gửi thông tin thành công!",
                      autoCloseTime: 1500,
                      canClose: true,
                      showProgress: true,
                      pauseOnHover: true,
                      pauseOnFocusLoss: true,
                      type: "success",
                      theme: "light",
                    });
                    // alert("Gửi thông tin thành công!");
                    resetForm();
                    handleClose();
                  } catch {
                    new Toast({
                      position: "top-right",
                      toastMsg: "Có lỗi xảy ra, vui lòng thử lại!",
                      autoCloseTime: 1500,
                      canClose: true,
                      showProgress: true,
                      pauseOnHover: true,
                      pauseOnFocusLoss: true,
                      type: "error",
                      theme: "light",
                    });
                    // alert("Có lỗi xảy ra, vui lòng thử lại!");
                  }
                }}

              >
                <Form className="form-container flex flex-col gap-2 h-full">
                  <h2 className="text-black text-xl">Fill in the information to complete the booking</h2>

                  {/* Email */}
                  <div className="form-row flex gap-2 flex-wrap">
                    <div className="form-field flex-1 min-w-[150px]">
                      <label className="block text-sm mb-1 text-black">Email</label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Your email"
                        style={{ pointerEvents: "none" }}
                        className="w-full p-2 border border-gray-300 rounded-md text-black text-sm bg-gray-100"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="form-row flex gap-2 flex-wrap">
                    <div className="form-field flex-1 min-w-[150px]">
                      <label className="block text-sm mb-1 text-black">Date</label>
                      <Field
                        name="date"
                        type="date"
                        min={today}
                        className="w-full p-2 border border-gray-300 rounded-md text-black text-sm"
                      />
                      <ErrorMessage name="date" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                    <div className="form-field flex-1 min-w-[150px]">
                      <label className="block text-sm mb-1 text-black">Time</label>
                      <Field
                        name="time"
                        type="time"
                        className="w-full p-2 border border-gray-300 rounded-md text-black text-sm"
                      />
                      <ErrorMessage name="time" component="div" className="text-red-500 text-xs mt-1" />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="form-field">
                    <label className="block text-sm mb-1 text-black">Address</label>
                    <Field
                      name="address"
                      type="text"
                      placeholder="Enter your address"
                      className="w-full p-2 border border-gray-300 rounded-md text-black text-sm"
                    />
                    <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  {/* Note */}
                  <div className="form-field">
                    <label className="block text-sm mb-1 text-black">Note</label>
                    <Field
                      name="note"
                      as="textarea"
                      placeholder="Enter additional notes"
                      className="w-full p-2 border border-gray-300 rounded-md text-black text-sm"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="button-container flex justify-between gap-2 mt-2">
                    <button
                      type="button"
                      className="back-button px-4 py-2 bg-gray-500 text-white rounded text-sm"
                      onClick={handleClose}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="submit-button px-4 py-2 bg-black text-white rounded text-sm"
                    >
                      Send
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </Box>
      </Modal>
    </section>
  );
}
