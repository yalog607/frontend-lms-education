import { useState } from 'react';
import { FaBars, FaTimes, FaChartLine, FaBook, FaComments, FaMoneyBillWave, FaCog, FaSignOutAlt, FaChevronLeft } from 'react-icons/fa';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Dashboard', icon: FaChartLine, color: 'text-blue-500' },
    { name: 'Course', icon: FaBook, color: 'text-green-500' },
    { name: 'Communication', icon: FaComments, color: 'text-purple-500' },
    { name: 'Revenue', icon: FaMoneyBillWave, color: 'text-yellow-500' },
    { name: 'Setting', icon: FaCog, color: 'text-base-100' },
  ];

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-full rounded-full bg-gradient-to-r from-indigo-600 bg-clip-text text-transparent to-indigo-400 flex items-center justify-center font-bold text-3xl">
            Yalina
          </div>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-700 max-h-96 overflow-y-auto">
          <nav className="flex flex-col p-4 space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors group text-white"
                >
                  <IconComponent className={`${item.color} text-lg`} />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center font-bold text-sm flex-shrink-0">
                M
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Manager</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
              <button className="ml-auto p-2 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
                <FaSignOutAlt className="text-red-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className={`hidden md:flex h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex-col ${
        isOpen ? 'w-64' : 'w-20'
      }`}>
        {/* Header - Avatar và tên Yalina */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center gap-3 flex-1">
              <div className="w-full bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent flex items-center justify-center font-bold text-3xl cursor-pointer select-none">
                Yalina
              </div>
            </div>
          )}
          
          {/* Nút toggle */}
          <button
            onClick={toggleSidebar}
            className="mx-auto p-1 hover:bg-gray-700 rounded-lg transition-all duration-300 ml-auto cursor-pointer"
            title={isOpen ? 'Thu nhỏ' : 'Mở rộng'}
          >
            <FaChevronLeft
              size={18} 
              className={`text-rose-50 transition-transform duration-300 ${!isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.name}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors group cursor-pointer"
              >
                <IconComponent className={`${item.color} text-lg flex-shrink-0`} />
                {isOpen && (
                  <span className="text-sm font-medium group-hover:text-white">{item.name}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer - Avatar Manager và nút đăng xuất */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center justify-between gap-2">
              {isOpen && (
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center font-bold text-sm flex-shrink-0">
                M
              </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">Manager</p>
                  <p className="text-xs text-gray-400 truncate">Admin</p>
                </div>
            </div>
              )}
            
            <button
              className="flex-1 md:flex-0 p-2 mx-auto hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0 cursor-pointer"
              title="Đăng xuất"
            >
              <FaSignOutAlt className="text-rose-500" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

