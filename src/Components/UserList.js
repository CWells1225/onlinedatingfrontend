import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProfileCard from "./UserProfileCard";

const UserList = () => {

  const [list, setList] = useState()

  useEffect(() => {
    const token = localStorage.getItem('token');
    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: 'GET',
      headers: reqHeaders,
      redirect: 'follow',
    };
    fetch(`${process.env.REACT_APP_APIURI}/api/user/userList`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          toast.error(result.msg)
        } else {
          setList(result);
        }
      })
      .catch(error => {
        toast.error(error.message);
      });
  }, [])

  return (
    <React.Fragment>
      <div className="user-wrapper">
        <div className="container-fluid">
          <div className="user-profile-card-sec mt-5">
            <div className="row">
              {list && list.map((item, index) => {
                return <UserProfileCard user={item} key={index} />
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UserList;
