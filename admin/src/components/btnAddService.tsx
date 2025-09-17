'use client';
import * as React from 'react';
import '@/styles/managerService.scss';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { API_CreateService } from '@/api/API_mngService';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 5,
};


const validationSchema = Yup.object({
  namePackage: Yup.string().required('Tên gói là bắt buộc'),
  pricePackage: Yup.number()
    .min(0, 'Giá gói không được âm')
    .required('Giá gói là bắt buộc'),
  description: Yup.string().required('Mô tả là bắt buộc'),
});

interface ButtonAddServiceProps {
  onAddService: (newService: Values & { id: number }) => void;
}

const ButtonAddService: React.FC<ButtonAddServiceProps> = ({ onAddService }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (
    values: Values,
    { setSubmitting, resetForm }: FormikHelpers<Values>
  ) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        Swal.fire({
          title: 'Lỗi!',
          text: 'Không tìm thấy token xác thực. Vui lòng đăng nhập lại!',
          icon: 'error',
          timer: 2000,
          confirmButtonText: 'OK',
        });
        setSubmitting(false);
        return;
      }
      const newService = await API_CreateService(values, token);

      onAddService(newService);

      // Show success message
      Swal.fire({
        title: 'Thành công!',
        text: 'Gói dịch vụ đã được tạo thành công.',
        icon: 'success',
        timer: 1500,
        confirmButtonText: 'OK',
      });

      // Reset the form and close the modal
      resetForm();
      handleClose();
    } catch (error) {
      console.error('Lỗi khi tạo gói dịch vụ:', error);
      Swal.fire({
        title: 'Lỗi!',
        text: 'Có lỗi xảy ra khi tạo gói dịch vụ!',
        icon: 'error',
        timer: 1500,
        confirmButtonText: 'OK',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          zIndex: 1000,
        }}
      >
        <Box sx={styleModal}>
          <h1 className="text-center font-bold text-xl">Nhập thông tin gói mới</h1>
          <Formik
            initialValues={{
              name: '',
              price: 0,
              description: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors }) => (
              <Form className="space-y-6 mt-4">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="namePackage"
                      className={`block text-sm font-medium mb-1 ${errors.name ? 'text-red-600' : ''
                        }`}
                    >
                      Tên gói
                    </label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Nhập tên gói"
                      className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'
                        } rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400`}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="w-1/2">
                    <label
                      htmlFor="price"
                      className={`block text-sm font-medium mb-1 ${errors.price ? 'text-red-600' : ''
                        }`}
                    >
                      Giá gói
                    </label>
                    <Field
                      id="price"
                      name="price"
                      placeholder="0"
                      type="number"
                      className={`w-full border ${errors.price ? 'border-red-500' : 'border-gray-300'
                        } rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400`}
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className={`block text-sm font-medium mb-1 ${errors.description ? 'text-red-600' : ''
                      }`}
                  >
                    Mô tả
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Nhập mô tả của bạn"
                    rows={5}
                    className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'
                      } rounded-md px-3 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  className="px-[2rem] py-[5px] rounded-[10px] bg-green-500 text-white font-bold hover:bg-green-600 cursor-pointer"
                >
                  Tạo
                </button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      <button
        onClick={handleOpen}
        className="bg-green-500 rounded-[30px] text-[15px] p-2 hover:bg-green-700 text-white flex justify-center items-center gap-2"
        type="button"
      >
        <FontAwesomeIcon icon={faPlus} />
        Thêm gói dịch vụ
      </button>
    </>
  );
};

export default ButtonAddService;