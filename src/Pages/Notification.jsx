
import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { GrCaretPrevious, GrCaretNext } from 'react-icons/gr';
import { useNotifications } from '../hooks/useNotification';

const Notification = () => {
  const {
    notifications,
    isLoading,
    isError,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
    isMarking,
  } = useNotifications();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = notifications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(notifications.length / itemsPerPage);

  useEffect(() => {
    document.title = "Notifications";
  }, []);

  if (isLoading)
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-white font-sans items-start">
        <Sidebar />
        <div className="container w-full min-h-screen mx-auto flex-1 flex flex-col bg-white p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 overflow-x-hidden overflow-y-auto">
          <div className="w-full flex justify-center items-center p-20">
            <span className="loading loading-spinner loading-lg text-rose-500"></span>
          </div>
        </div>
      </div>
    );
  if (isError)
    return (
      <div className="flex flex-col md:flex-row min-h-screen bg-white font-sans items-start">
        <Sidebar />
        <div className="container w-full min-h-screen mx-auto flex-1 flex flex-col bg-white p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 overflow-x-hidden overflow-y-auto">
          <div className="text-red-500">{error?.message || 'Error'}</div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white font-sans items-start">
      <Sidebar />
      <div className="container w-full min-h-screen mx-auto flex-1 flex flex-col bg-white p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 overflow-x-hidden overflow-y-auto">
        <div className="bg-white w-full rounded drop-shadow-md transition-all duration-300 p-6 border border-gray-500/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl text-black">Notifications</h2>
            <span className="inline-block px-3 py-1 bg-info text-white rounded-full text-sm">
              Unread: {unreadCount}
            </span>
          </div>
          {unreadCount > 0 && (
            <button
              className="btn btn-success rounded text-white"
              onClick={markAllAsRead}
              disabled={isMarking}
            >
              Mark all as read
            </button>
          )}
          <div className="w-full divider my-1"></div>
          <div className="overflow-x-auto rounded-box border border-gray-200/50 bg-white">
            <table className="table text-black">
              <thead>
                <tr className="text-black">
                  <th></th>
                  <th>Title</th>
                  <th>Content</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 w-full ">
                      <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                        <IoInformationCircleOutline size={40} />
                        <span className="font-medium text-lg">
                          No notifications found
                        </span>
                        <span className="text-sm">
                          You will see notifications here when you join courses.
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((n, i) => (
                    <tr key={n._id} className={n.read ? "bg-gray-200" : "bg-blue-100 hover:bg-blue-200"}>
                      <th>{indexOfFirstItem + i + 1}</th>
                      <td className="font-semibold cursor-pointer" onClick={() => !n.read && markAsRead(n._id)}>{n.title}</td>
                      <td className="text-sm text-gray-600 cursor-pointer" onClick={() => !n.read && markAsRead(n._id)}>{n.content}</td>
                      <td className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</td>
                      <td>{n.read ? <span className="text-success font-bold">Read</span> : <span className="text-error font-bold">Unread</span>}</td>
                      <td className="flex gap-2">
                        {!n.read && (
                          <button
                            className="px-2 py-1 bg-green-500 text-white rounded"
                            onClick={() => markAsRead(n._id)}
                            disabled={isMarking}
                          >Read</button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 0 && (
            <div className="flex justify-center mt-2">
              <div className="join">
                <button
                  className="join-item btn btn-sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <GrCaretPrevious />
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`join-item btn btn-sm ${currentPage === index + 1 ? "btn-active btn-secondary" : ""}`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  className="join-item btn btn-sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <GrCaretNext />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
