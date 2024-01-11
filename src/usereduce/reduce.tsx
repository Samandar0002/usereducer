import React, { useReducer, useEffect, useState } from 'react';
import EditUserModal from './edit';

import { User, TableState, TableAction } from '../types/types'

import LoaderSpinner  from '../components/loader';

const SET_USERS = 'SET_USERS';
const SET_LOADING = 'SET_LOADING';
const SET_ERROR = 'SET_ERROR';


const tableReducer = (state: TableState, action: TableAction): TableState => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload as User[], loading: false };
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_ERROR:
      return { ...state, error: action.payload as string, loading: false };
    default:
      return state;
  }
};

const initialState: TableState = {
  users: [],
  loading: false,
  error: null,
};

const TableComponent: React.FC = () => {
  const [state, dispatch] = useReducer(tableReducer, initialState);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      dispatch({ type: SET_USERS, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: 'An error occurred while fetching users' });
    }
  };

  const handleDelete = (userId: number) => {
    dispatch({ type: SET_USERS, payload: state.users.filter(user => user.id !== userId) });
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleEditSave = (user: User) => {
    const updatedUsers = state.users.map(u => u.id === user.id ? user : u);
    dispatch({ type: SET_USERS, payload: updatedUsers });
    setEditingUser(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
     {state.loading ? (
                <LoaderSpinner /> 
                ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Username
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              City
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Zipcode
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Website
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Company
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {state.users.map((user) => (
            <tr key={user.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.id}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.name}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.username}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.email}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.address.city}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.address.zipcode}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <a href='' className="text-blue-500 hover:text-blue-800">
                  {user.website}
                </a>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.company.name}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex justify-start items-center">
                <button
                  onClick={() => handleEdit(user)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 hover:text-red-900 "
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
                )}
    {editingUser && (
        <EditUserModal
          user={editingUser}
          onSave={handleEditSave} 
          onClose={() => setEditingUser(null)}
      />
    )}
  </>
  );
};

export default TableComponent;
