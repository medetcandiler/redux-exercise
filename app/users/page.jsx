"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../features/usersSlice/usersSlice";
import { v4 as uuidv4 } from "uuid";
import Loader from "../components/Loader";

function Users() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const flatUsersArr = users.users.flatMap((arr) => arr);

  console.log(flatUsersArr);

  const wait = (duration) => {
    return new Promise((resolve) => setTimeout(resolve, duration));
  };

  return (
    <>
      {users.loading && (
        <div className="flex items-center justify-center text-black">
          <Loader />
        </div>
      )}
      {users.error && <div>{users.error}</div>}
      {(users.loading || users.users.length > 0) && (
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3  gap-5 md:space-x-3 ">
          {flatUsersArr.map((user) => (
            <div
              className="border flex flex-col items-center border-zinc-600 w-96 h-auto py-10 border-collapse rounded-md shadow-lg"
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
              <h1>
                <span className="text-xl font-bold">User email:</span>
                {user.email}
              </h1>
              <h1>
                <span className="text-xl font-bold">User phone:</span>
                {user.phone}
              </h1>
              <h1 className="bg-black text-white rounded-md px-4 py-2 mt-2">
                <a target="_alt" href={user.email}>
                  {user.email}
                </a>
              </h1>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Users;
