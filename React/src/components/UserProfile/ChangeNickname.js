import React from "react";

function ChangeNickname() {
  return (
    <>
      <div className="changeNickname">
        <h1 className="mainhead1"> Nickname Information</h1>
        <div className="form">
          <div className="form-group">
            <label htmlFor="old-nickname">
              Old Nickname <span>*</span>
            </label>
            <input type="text" name="nickname" id="nickname" />
          </div>

          <div className="form-group">
            <label htmlFor="new-nickname">
              New Nickname <span>*</span>
            </label>
            <input type="text" name="nickname" id="nickname" />
          </div>
        </div>

        <button className="mainbutton1">Update</button>
      </div>
    </>
  );
}

export default ChangeNickname;
