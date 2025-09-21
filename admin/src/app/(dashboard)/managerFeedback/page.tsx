'use client';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Toast from 'typescript-toastify';
import '@/styles/managerFeedback.scss';
import { API_GetFeedbacks, API_DeleteFeedback } from '@/api/API_mngFeedback';


const ManagerFeedback: React.FC = () => {
  const [data, setData] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('token');
      if (!token) {
        Swal.fire({
          title: 'Lỗi!',
          text: 'Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      try {
        const feedbacks = await API_GetFeedbacks(token);
        if (Array.isArray(feedbacks)) {
          setData(feedbacks);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    const token = Cookies.get('token');
    if (!token) return;

    Swal.fire({
      title: "Bạn chắc chắn muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa!",
      cancelButtonText: "Hủy"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await API_DeleteFeedback(id, token);
          setData(prevData => prevData.filter(item => item.id !== id));
          new Toast({
            position: "top-right",
            toastMsg: "Feedback đã được xóa thành công.",
            autoCloseTime: 1500,
            canClose: true,
            showProgress: true,
            pauseOnHover: true,
            pauseOnFocusLoss: true,
            type: "success",
            theme: "light",
          });
        } catch (error) {
          console.error('Lỗi khi xóa feedback:', error);
          new Toast({
            position: "top-right",
            toastMsg: "Có lỗi xảy ra khi xóa Feedback!",
            autoCloseTime: 1500,
            canClose: true,
            showProgress: true,
            pauseOnHover: true,
            pauseOnFocusLoss: true,
            type: "error",
            theme: "light",
          });
        }
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center py-2">Quản lí đánh giá</h1>
      <div className="overflow-x-auto px-2">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Sao</th>
              <th className="border px-4 py-2 text-left">Bình luận</th>
              <th className="border px-4 py-2 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">Chưa có đánh giá nào</td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{item.email}</td>
                  <td className="border px-4 py-2 text-yellow-500">{item.ratingIndex}</td>
                  <td className="border px-4 py-2">{item.content}</td>
                  <td className="border px-4 py-2">
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow h-9 px-4 py-2 duration-300 text-white bg-red-600 hover:bg-red-500"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerFeedback;
