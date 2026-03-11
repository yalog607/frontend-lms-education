import { useMemo, useState } from 'react';
import SidebarAdmin from '../../Components/admin/SidebarAdmin.jsx';
import useAuthStore from '../../store/useAuthStore.js';
import { useAdminUsers, useDeleteUser } from '../../hooks/useAdmin.js';

export default function UserManagement() {
  const { user: currentUser } = useAuthStore();
  const { users, source, fallbackReason, isLoading } = useAdminUsers();
  const { deleteUser, isDeletingUser } = useDeleteUser();
  const [keyword, setKeyword] = useState('');

  const filteredUsers = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    if (!normalizedKeyword) {
      return users;
    }

    return users.filter((user) => {
      const fullName = `${user?.first_name || ''} ${user?.last_name || ''}`.toLowerCase();
      const email = (user?.email || '').toLowerCase();
      const role = (user?.role || '').toLowerCase();
      return fullName.includes(normalizedKeyword) || email.includes(normalizedKeyword) || role.includes(normalizedKeyword);
    });
  }, [users, keyword]);

  const onDelete = (userId) => {
    if (!userId || userId === currentUser?._id) {
      return;
    }

    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    deleteUser(userId);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <SidebarAdmin />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="mb-6 bg-linear-to-r from-rose-50 to-pink-50 border border-rose-100 rounded-2xl p-5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 mt-1">Search and review learner, teacher, and admin accounts.</p>
        </div>

        <div className="mb-4 bg-white border border-rose-100 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <input
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Search by name, email, role..."
            className="input input-bordered w-full md:max-w-sm"
          />
          <div className="text-sm text-gray-500">
            Source: <span className="font-semibold text-gray-700">{source}</span>
          </div>
        </div>

        {fallbackReason && (
          <div className="alert alert-warning mb-4">
            <span>{fallbackReason}</span>
          </div>
        )}

        <div className="bg-white border border-rose-100 rounded-2xl overflow-hidden shadow-sm">
          {isLoading ? (
            <div className="w-full h-56 flex items-center justify-center">
              <span className="loading loading-spinner loading-lg text-rose-500"></span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table text-gray-800">
                <thead className="bg-rose-50 text-gray-700">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Courses</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-gray-500">
                        No users found.
                      </td>
                    </tr>
                  )}

                  {filteredUsers.map((user, index) => (
                    <tr key={user?._id || `${user?.email}-${index}`} className="hover">
                      <td>{index + 1}</td>
                      <td className="font-medium">{user?.first_name || 'N/A'} {user?.last_name || ''}</td>
                      <td>{user?.email || 'N/A'}</td>
                      <td>
                        <span className="badge badge-outline capitalize">{user?.role || 'user'}</span>
                      </td>
                      <td>{user?.coursesCount || 0}</td>
                      <td>
                        <button
                          className="btn btn-xs btn-error text-white"
                          onClick={() => onDelete(user?._id)}
                          disabled={isDeletingUser || user?._id === currentUser?._id}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
