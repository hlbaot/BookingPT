'use client';
import React, { useState, useEffect } from 'react';
import '@/styles/managerClient.scss';
import Toast from 'typescript-toastify';
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import {
  API_GetBookings,
  API_GetPackages,
  API_DeleteBooking,
  API_ApproveBooking
} from '@/api/API_mngClient';

const ManagerClient: React.FC = () => {
  const [data, setData] = useState<Booking[]>([]);
  const [filteredData, setFilteredData] = useState<Booking[]>([]);
  const [packages, setPackages] = useState<ServicePackage[]>([]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        const bookings = await API_GetBookings(token);
        setData(bookings);

        const pkgs = await API_GetPackages(token);
        setPackages(pkgs);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        Swal.fire({
          title: 'Lỗi!',
          text: 'Có lỗi xảy ra khi lấy dữ liệu!',
          icon: 'error',
          timer: 2000,
          confirmButtonText: 'OK'
        });
      }
    };

    fetchData();
  }, []);

  const handleDelete = (formBookingId: number) => {
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
          await API_DeleteBooking(formBookingId, token);
          setData(prevData => prevData.filter(item => item.formBookingId !== formBookingId));

          new Toast({
            position: "top-right",
            toastMsg: "Lịch đặt đã được xoá thành công.",
            autoCloseTime: 1500,
            canClose: true,
            showProgress: true,
            pauseOnHover: true,
            pauseOnFocusLoss: true,
            type: "success",
            theme: "light",
          });
        } catch (error) {
          console.error('Lỗi khi xóa lịch đặt:', error);
          new Toast({
            position: "top-right",
            toastMsg: "Có lỗi xảy ra khi xoá lịch đặt.",
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
  }

  const handleApprove = async (email: string) => {
    const token = Cookies.get('token');
    if (!token) return;

    try {
      await API_ApproveBooking(email, token);
      setData(prevData =>
        prevData.map(item =>
          item.email === email ? { ...item, status: true } : item
        )
      );

      Swal.fire({
        title: 'Đã duyệt!',
        text: 'Lịch đặt đã được duyệt.',
        icon: 'success',
        timer: 2000,
      });
    } catch (error) {
      console.error('Lỗi khi duyệt lịch đặt:', error);
      Swal.fire({
        title: 'Lỗi!',
        text: 'Có lỗi xảy ra khi duyệt lịch đặt!',
        icon: 'error',
        timer: 2000,
      });
    }
  }

  return (
    <div className='mngClient'>
      <h1 className='w-full bg-white z-10 text-2xl font-bold text-center py-2 sticky top-0'>Đặt lịch</h1>

      {/* Tìm kiếm và bộ lọc */}
      <div className="w-full p-4 flex gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            className="w-[300px] rounded-xl h-12 px-4 border border-gray-300 focus:outline-none"
            type="text"
            placeholder="Tìm kiếm theo email khách hàng"
            onChange={(e) => {
              const searchTerm = e.target.value.toLowerCase();
              setFilteredData(
                data.filter(item => item.email.toLowerCase().includes(searchTerm))
              );
            }}
          />

          <div className="px-2 bg-white rounded-xl">
            <select
              className="w-fit rounded-xl h-12 px-4 focus:outline-none"
              onChange={(e) => {
                const packageFilter = e.target.value;
                if (packageFilter) {
                  setFilteredData(data.filter(item => item.packageName === packageFilter));
                } else {
                  setFilteredData(data);
                }
              }}
            >
              <option value="">Tất cả gói dịch vụ</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.name}>
                  {pkg.name} - {pkg.price} VNĐ
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bảng danh sách */}
      <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Ngày & Giờ</th>
            <th className="border px-4 py-2 text-left">Gói</th>
            <th className="border px-4 py-2 text-left">Địa chỉ</th>
            <th className="border px-4 py-2 text-left">Giá</th>
            <th className="border px-4 py-2 text-left">Ghi chú</th>
            <th className="border px-4 py-2 text-left">Trạng Thái</th>
            <th className="border px-4 py-2 text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center py-4">
                Chưa có lịch đặt nào
              </td>
            </tr>
          ) : (
            filteredData.map((item) => (
              <tr key={item.formBookingId} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{item.email}</td>
                <td className="border px-4 py-2">{item.bookTime}</td>
                <td className="border px-4 py-2">{item.packageName}</td>
                <td className="border px-4 py-2">{item.location}</td>
                <td className="border px-4 py-2">{item.pricePackage} VNĐ</td>
                <td className="border px-4 py-2">{item.message}</td>
                <td className="border px-4 py-2 text-center">
                  {item.status === true ? 'Đã duyệt' : 'Chưa duyệt'}
                </td>
                <td className="border text-yellow-500 px-4 py-2 flex gap-2">
                  {item.status !== true && (
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                      onClick={() => handleApprove(item.email)}
                    >
                      Duyệt
                    </button>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => handleDelete(item.formBookingId)}
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
  );
};

export default ManagerClient;
