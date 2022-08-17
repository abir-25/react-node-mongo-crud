import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  const handleUpdateUser = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/users/update/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          alert("Updated User Successfully");
          setUser({});
        }
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleNameChange = (e) => {
    const updatedUser = { name: e.target.value, email: user.email };
    setUser(updatedUser);
  };
  const handleEmailChange = (e) => {
    const updatedUser = { name: user.name, email: e.target.value };
    setUser(updatedUser);
    // const updatedUser = { ...user };
    // updatedUser.email = e.target.value;
  };
  return (
    <div>
      <h2>Update {user.name}</h2>
      <form onSubmit={handleUpdateUser}>
        <input
          type="text"
          value={user.name || ""}
          onChange={handleNameChange}
        />
        <br />
        <input
          type="email"
          value={user.email || ""}
          onChange={handleEmailChange}
        />
        <br />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateUser;
