import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDeleteAction = (id) => {
    const proceed = window.confirm("Are you sure to want delete?");
    if (proceed) {
      const url = `http://localhost:5000/users/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            window.alert("Deleted Successfully");
            const remainingUsers = users.filter((user) => user._id !== id);
            setUsers(remainingUsers);
          }
        });
    }
  };
  return (
    <div>
      <h2>Users Available: {users.length}</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} :: {user.email}
            <Link to={`/users/update/${user._id}`}>
              <button>Update</button>
            </Link>
            <button onClick={() => handleDeleteAction(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
