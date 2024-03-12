import React, { useState, useEffect } from "react";
import AddModal from "../components/Modals/AddModal";
import EditModal from "../components/Modals/EditModal";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "../components/Modals/DeleteModal";

function Profile() {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(6);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserAndContacts = async () => {
      const token = localStorage.getItem("token");

      // Fetch user
      const userResponse = await fetch(
        "https://contact-book-yx3x.onrender.com/api/users/current",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch contacts
      const contactsResponse = await fetch(
        "http://localhost:5001/api/contacts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (contactsResponse.status === 401) {
        // assuming 401 status code indicates an expired session
        localStorage.removeItem("token");
        navigate("/login");
      }

      const contactsData = await contactsResponse.json();
      setContacts(contactsData);
    };

    fetchUserAndContacts();
  }, []);

  // if (!user || contacts.length === 0) {
  //   return <div>Session expired! please login again</div>;
  // }

  // get current contacts number
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className=" mx-auto px-4 sm:px-8 py-4 bg-white shadow-md rounded-lg">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2">
            <h3 className="text-2xl font-semibold text-gray-800">
              My contacts
            </h3>
            <div className="mt-2 text-gray-600">
              <div className="text-indigo-500 font-bold">{user?.username}</div>
              <div className="text-indigo-500 font-bold"> {user?.email}</div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-2 flex items-center justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 font-medium text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg"
            >
              Add contact
            </button>
          </div>
          {isModalOpen && (
            <AddModal
              closeModal={() => setIsModalOpen(false)}
              onAddContact={(newContact) =>
                setContacts((prevContacts) => [...prevContacts, newContact])
              }
            />
          )}
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Username</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Phone</th>
                <th className="py-3 px-6">Created </th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y divide-gray-200">
              {currentContacts.map((item) => (
                <tr key={item?._id}>
                  <td className="px-6 py-4">{item?.name}</td>
                  <td className="px-6 py-4">
                    <Link to={`/contact-details/${item?._id}`}>
                      {item?.email}
                    </Link>
                  </td>

                  <td className="px-6 py-4">{item?.phone}</td>
                  <td className="px-6 py-4">{item?.createdAt}</td>
                  <td className="px-6 py-4 flex justify-center items-center space-x-4">
                    <button
                      onClick={() => setEditItemId(item._id)}
                      className="px-3 py-2 font-medium text-indigo-600 hover:text-indigo-500 hover:bg-gray-50 rounded-lg"
                    >
                      Edit
                    </button>
                    {editItemId === item._id && (
                      <EditModal
                        id={item?._id}
                        name={item?.name}
                        email={item?.email}
                        phone={item?.phone}
                        closeModal={() => setEditItemId(null)}
                        onEditContact={(updatedContact) =>
                          setContacts((prevContacts) =>
                            prevContacts.map((contact) =>
                              contact._id === updatedContact._id
                                ? updatedContact
                                : contact
                            )
                          )
                        }
                      />
                    )}
                    <button
                      onClick={() => setDeleteItemId(item._id)}
                      className="px-3 py-2 font-medium text-red-600 hover:text-red-500 hover:bg-gray-50 rounded-lg"
                    >
                      Delete
                    </button>
                    {deleteItemId === item._id && (
                      <DeleteModal
                        id={item?._id}
                        onDeleteContact={(id) =>
                          setContacts((prevContacts) =>
                            prevContacts.filter((contact) => contact._id !== id)
                          )
                        }
                        closeModal={() => setDeleteItemId(null)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4 gap-2">
        {Array(Math.ceil(contacts.length / contactsPerPage))
          .fill()
          .map((_, i) => (
            <button
              className="px-3 py-2 font-medium text-indigo-600 hover:text-indigo-500 hover:bg-gray-100 rounded-lg  "
              key={i}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
      </div>
    </>
  );
}

export default Profile;
