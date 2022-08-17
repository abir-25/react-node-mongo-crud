import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  const nameRef = useRef();
  const emailRef = useRef();

  const handleUpdateUser = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const editUser = { name, email };

    fetch(`http://localhost:5000/users/update/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editUser),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Upate:  ", result);
        // if (result.insertedId) {
        //   alert("Successfully Updated User");
        //   e.target.reset();
        // }
      });
    e.preventDefault();
  };

  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);
  return (
    <div>
      <h2>Update {user.name}</h2>
      <form onSubmit={handleUpdateUser}>
        <input type="text" defaultValue={user.name} ref={nameRef} />
        <br />
        <input type="email" defaultValue={user.email} ref={emailRef} />
        <br />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateUser;
