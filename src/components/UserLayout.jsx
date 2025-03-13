import React from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";

const UserLayout = ({loginInfo, setLoginInfo}) => {
  return (
    <>
      <div className="user-container"> 
        <div></div>
        <div>
          <UserHeader loginInfo={loginInfo} setLoginInfo={setLoginInfo}/>
        </div>  
        <div>
          <Outlet />
        </div>
      </div>

    </>
  );
};

export default UserLayout;
