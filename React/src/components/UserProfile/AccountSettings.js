import React, { useEffect, useState } from "react";
import "../../styles/AccountSettings.css";
import axios from "api/axios.js";
import useAuth from "hooks/useAuth.js";

const AccountSettings = () => {

  const { auth } = useAuth();
  const userId = auth._id;
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`/users/${userId}`).then((res) => {
      setUser(res.data);
    }
    );
  }, []);


  return (
    <>
      <div className="accountsettings">
        <h1 className="mainhead1">Personal Information</h1>
        <div className="form">
          <div className="form-group">
            <label htmlFor="name">
              <span>Username</span>
            </label>
            <input type="text" value={user.username} id="username" />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <span>Email</span>
            </label>
            <input type="text" value={user.email} id="email" />
          </div>

        </div>
      </div>
    </>
  );
};

export default AccountSettings;
