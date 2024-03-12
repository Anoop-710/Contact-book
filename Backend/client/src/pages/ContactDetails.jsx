import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const ContactDetails = () => {
  const [contact, setContact] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchContact = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5001/api/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setContact(data);
      } else {
        // Handle error
        console.error(data);
      }
    };

    fetchContact();
  }, [id]);

  if (!contact) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Contact Details</h1>
        <p className="text-lg mb-2">
          <span className="font-bold">Name:</span> {contact.name}
        </p>
        <p className="text-lg mb-2">
          <span className="font-bold">Email:</span> {contact.email}
        </p>
        <p className="text-lg mb-2">
          <span className="font-bold">Phone:</span> {contact.phone}
        </p>
        <p className="text-lg mb-2">
          <span className="font-bold">Created At:</span> {contact.createdAt}
        </p>
        <p className="text-lg mb-2">
          <span className="font-bold">Updated At:</span> {contact.updatedAt}
        </p>
      </div>
    </>
  );
};

export default ContactDetails;
