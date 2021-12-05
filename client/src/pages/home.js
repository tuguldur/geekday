import React, { useState } from "react";
import axios from "axios";
const Home = () => {
  const [state, setState] = useState({ email: "", name: "" });
  const [loading, setLoading] = useState(false);
  const onChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div
        className="
              flex flex-col
              bg-white
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
        <div className="text-center text-sm  sm:text-md text-gray-800">
          Email хаягаа оруулаад үнэгүй <b>flag</b> аваарай 😄
        </div>
        <form
          className="space-y-4"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            axios
              .post("/api/woody/mail", { ...state })
              .then((response) => alert(response.data.msg))
              .catch(() => alert("Failed to send a mail"))
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
          />
          <input
            type="email"
            name="email"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            placeholder="Email"
            onChange={onChange}
            required
            autoFocus
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
              <span className="mr-2 uppercase">Send flag 😗</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Home;
