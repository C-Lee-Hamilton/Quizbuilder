import { React, useState } from "react";
import axios from "axios";
function Creator({ create, setCreate }) {
  const [newUser, setNewUser] = useState();
  const [newPass, setNewPass] = useState();
  const [newEmail, setNewEmail] = useState();
  const [registerSuccess, setRegisterSuccess] = useState();

  if (!create) return null;
  const closer = () => {
    setCreate(false);
    setNewUser();
    setNewPass();
    setNewEmail();
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/Users/register",
        {
          email: newEmail,
          password: newPass,
          username: newUser,
          time: [],
        }
      );
      console.log(response.data.user);

      response.data.user === undefined
        ? setRegisterSuccess("try again")
        : setRegisterSuccess("success");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <span className="text-xl my-2">Create Account</span>
      <input
        className="text-black w-full px-4 py-2 text-xl font-bold border-4 border-grey-400 text-center rounded-lg my-2 shadow-custom"
        type="text"
        placeholder="username"
        onChange={(event) => setNewUser(event.target.value)}
        value={newUser}
      />
      <input
        className="text-black w-full px-4 py-2 text-xl font-bold border-4 border-grey-400 text-center rounded-lg my-2 shadow-custom"
        type="password"
        placeholder="password"
        onChange={(event) => setNewPass(event.target.value)}
        value={newPass}
      />
      <input
        className="text-black w-full px-4 py-2 text-xl font-bold border-4 border-grey-400 text-center rounded-lg my-2 shadow-custom"
        type="text"
        placeholder="email"
        onChange={(event) => setNewEmail(event.target.value)}
        value={newEmail}
      />
      {registerSuccess}
      <button
        onClick={handleRegister}
        className="px-4 w-full py-2 border-2 text-xl sm:mx-1 bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
      >
        Create Account
      </button>
      <button
        onClick={closer}
        className="px-4 w-full py-2 border-2 text-xl sm:mx-1 bg-green-500 bg-opacity-50 text-white rounded-lg my-2 lg:mx-4 hover:bg-white hover:text-green-500 active:scale-95 shadow-custom"
      >
        Go Back
      </button>
    </>
  );
}

export default Creator;
