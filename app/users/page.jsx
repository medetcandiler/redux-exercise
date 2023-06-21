"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { FaTrash } from 'react-icons/fa'

import { fetchUsers } from "../features/usersSlice/usersSlice";
import Loader from "../components/Loader";
import { deleteUser } from "../features/usersSlice/usersSlice";

function Users() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users.users.length) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.users.length]);


  const handleDelete = (id) => {
    dispatch(deleteUser(id))
  }

  return (
    <>
      {users.loading && (
        <div className="flex items-center   justify-center text-black">
          <Loader />
        </div>
      )}
      {users.error && <div>{users.error}</div>}
      {(users.loading || users.users.length > 0) && (
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3  gap-5 md:space-x-3 ">
          {users.users.map((user) => (
            <div
              className="border flex flex-col items-center border-zinc-600 w-96  p-10 border-collapse rounded-md shadow-xl"
              key={uuidv4()}
            >
              <h1>
                <span className="text-xl font-bold">User id:</span>
                {user.id}
              </h1>
              <h1>
                <span className="text-xl font-bold">User name:</span>
                {user.name}
              </h1>
              <h1></h1>
              <h2></h2>

              <h1>
                <span className="text-xl font-bold">User email:</span>
                {user.email}
              </h1>
              <h1>
                <span className="text-xl font-bold">User phone:</span>
                {user.phone}
              </h1>
              <Link className="link" target="_alt" href='#' >
                {user.email}
              </Link>
              <button onClick={() => handleDelete(user.id)} className="mt-2 text-white bg-red-600 p-2 rounded-full hover:bg-white  hover:text-red-600 ">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Users;
