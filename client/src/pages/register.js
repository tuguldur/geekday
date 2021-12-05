import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
const Register = () => {
  const [state, setState] = useState({ email: "", name: "" });
  const [cookies, setCookie] = useCookies(["auth"]);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
  useEffect(() => {
    if (cookies.auth)
      axios
        .get("/api/woody/@me")
        .then((response) => setUser(response.data.flag))
        .catch((error) => console.log(error));
  }, [cookies]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-600  px-4">
      <div
        className="
              flex flex-col
              bg-white
              bg-opacity-50
              shadow-md
              px-4
              sm:px-6
              md:px-8
              lg:px-10
              py-8
              rounded
              w-full
              max-w-md
              space-y-4"
      >
        {!user ? (
          <>
            <div className="text-center font-bold uppercase text-sm  sm:text-md text-gray-800">
              Бүртгүүлэх
            </div>
            <form
              className="space-y-4"
              autoComplete="off"
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                axios
                  .post("/api/woody/register", { ...state })
                  .then((response) => window.location.reload())
                  .finally(() => setLoading(false));
              }}
            >
              <input
                type="text"
                name="name"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                placeholder="Нэр"
                onChange={onChange}
                required
                autoFocus
              />
              <input
                type="text"
                name="username"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                placeholder="Username"
                onChange={onChange}
                required
              />
              <input
                type="password"
                name="password"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                placeholder="Password"
                onChange={onChange}
                required
              />
              <div className="flex w-full">
                <button
                  type="submit"
                  className="
                 flex
                 items-center
                 justify-center
                 focus:outline-none
                 text-white text-sm
                 sm:text-base
                 bg-blue-500
                 hover:bg-blue-600
                 rounded
                 py-2
                 w-full
                 transition
                 duration-150
                 ease-in
                 "
                  disabled={loading}
                >
                  <span className="mr-2 uppercase">GET FLAG</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center ">
            <p>{user}</p>
            <a
              href="#"
              className="text-blue-600 font-bold"
              onClick={() => {
                setCookie("auth", null);
                window.location.reload();
              }}
            >
              Гарах
            </a>
            <p className="text-xs">
              {Buffer.from(cookies.auth, "base64").toString("ascii")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Register;
