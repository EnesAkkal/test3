import React, { useEffect, useState } from "react";
import "../../styles/AccountSettings.css";
import "../../styles/AccountSettings.css";
import axios from "api/axios.js";
import useAuth from "hooks/useAuth.js";


function ChangePassword()  {

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
    <div className="changepassword">
      <h1 className="mainhead1"> Password Information</h1>
      <div className="form">

        <div className="form-group">
          <label htmlFor="Current-password">
            <span>Current Password </span>
          </label>
          <input type="text" value={user.password} id="password" />
        </div>
      </div>

    </div>
  </>
  )
}

export default ChangePassword