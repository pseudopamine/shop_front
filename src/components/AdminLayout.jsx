import React from "react";
import { Outlet } from "react-router-dom";
import styles from './AdminLayout.module.css'
import UserHeader from "./UserHeader";

const AdminLayout = () => {
  return (
    <>
      <div className={styles.admin_container}>
        <div className={styles.admin_header}>
          <UserHeader />
        </div>
        <div className={styles.admin_body}>
          <div className={styles.side_div}>
            사이드 메뉴
          </div>
          <div className={styles.content_div}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
