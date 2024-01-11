import { User } from '../types/types';
import React, { useState, useEffect } from 'react';

const EditUser: React.FC<{
  user: User;
  onSave: (user: User) => void;
  onClose: () => void;
  }> = ({ user, onSave, onClose }) => {
  const [editedUser, setEditedUser] = useState<User>({ ...user });

  useEffect(() => {
    setEditedUser({ ...user });
  }, [user]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Edit User</h3>

        <input
          type="text"
          value={editedUser.name}
          onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
          className="block w-full mb-3 p-2 border rounded"
          placeholder="Name"
        />
        
        <input
          type="text"
          value={editedUser.username}
          onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
          className="block w-full mb-3 p-2 border rounded"
          placeholder="Username"
        />

        <input
          type="email"
          value={editedUser.email}
          onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
          className="block w-full mb-3 p-2 border rounded"
          placeholder="Email"
        />

        <input
          type="text"
          value={editedUser.address.city}
          onChange={(e) => setEditedUser({ ...editedUser, address: { ...editedUser.address, city: e.target.value } })}
          className="block w-full mb-3 p-2 border rounded"
          placeholder="City"
        />

        <input
          type="text"
          value={editedUser.address.zipcode}
          onChange={(e) => setEditedUser({ ...editedUser, address: { ...editedUser.address, zipcode: e.target.value } })}
          className="block w-full mb-3 p-2 border rounded"
          placeholder="Zipcode"
        />

        <input
          type="text"
          value={editedUser.website}
          onChange={(e) => setEditedUser({ ...editedUser, website: e.target.value })}
          className="block w-full mb-3 p-2 border rounded"
          placeholder="Website"
        />

        <input
          type="text"
          value={editedUser.company.name}
          onChange={(e) => setEditedUser({ ...editedUser, company: { ...editedUser.company, name: e.target.value } })}
          className="block w-full mb-3 p-2 border rounded"
          placeholder="Company Name"
        />

        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => onSave(editedUser)}
          >
            Save
          </button>
          <button
            className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold py-2 px-4 border border-gray-500 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
