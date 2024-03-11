import React, { useState } from "react";

const EditModal = ({ id, name, email, phone, closeModal, onEditContact }) => {
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhone, setNewPhone] = useState(phone);

  const validation = () => {
    if (
      newName.length > 3 &&
      newEmail.includes("@") &&
      newPhone.length === 10
    ) {
      return true;
    }
    return false;
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!validation()) {
      // Handle validation errors
      window.alert("Please enter valid data");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5001/api/contacts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          phone: newPhone,
        }),
      });

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        // Update the contact in the contacts state
        onEditContact(data);
        closeModal();
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-8">
          <span
            className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 cursor-pointer"
            onClick={closeModal}
          >
            &times;
          </span>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username:
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Username"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone:
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Phone"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Edit contact
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditModal;
