import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageContext from "../contexts/MessageContext";
import UserContext from "../contexts/UserContext";

const UserState = (props) => {
  const [user, setUser] = useState(false);
  console.log(user);

  useEffect(() => {
    if (localStorage.getItem("@token")) {
      setUser(true);
    }
  }, []);

  const { showMessage } = useContext(MessageContext);

  const navigate = useNavigate();

  const onLogin = async (email, password) => {
    if (email.length === 0) {
      return showMessage("Error", "Enter Email");
    }
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: email,
        password: password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      return fetch("http://127.0.0.1:3000/api/v1/auth/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (!result.authtoken) {
            return showMessage("Error", `${result.error}`);
          }
          if (!result.user.admin) {
            return showMessage("Error", "Invalid Details!");
          } else {
            setUser(true);
            localStorage.setItem("@token", result.authtoken);
            return navigate("/");
          }
        })
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  const onLogout = () => {
    localStorage.removeItem("@token");
    setUser(false);
    navigate("/login");
  };
  return (
    <UserContext.Provider value={{ user, setUser, onLogin, onLogout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
