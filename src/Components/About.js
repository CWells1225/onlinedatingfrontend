import React, { useEffect, useState } from "react";
import { APIURL } from '../config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avatar from '../assets/images/avatar.png';

const About = () => {

  const [user, setUser] = useState()

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: 'GET',
      headers: reqHeaders,
      redirect: 'follow',
    };
    fetch(`${process.env.REACT_APP_APIURI}/api/user/userData`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          toast.error(result.msg)
        } else {
          toast.success(result.msg);
          const data = result.data[0];
          setUser(data);
        }
      })
      .catch(error => {
        toast.error(error.message);
      });
  }, []);


  return (
    <React.Fragment>
      <div className="about-wrapper">
        <div className="container-fluid">
          {user ?
            <div className="about-content">
              <div className="about-content-header card mx-auto col-md-10 mt-5 shadow-sm">
                <div className="row">
                  <div className="col-md-3 about-profile-outer text-center">
                    <img
                      className="rounded-circle about-profile-img"
                      src={user && user.avatar ? `${process.env.REACT_APP_APIURI}/uploads/${user.avatar}` : avatar}
                      alt="profile-img"
                    />
                  </div>
                  <div className="col-md-9 p-0">
                    <h3 className="mt-3 ">{`${user.fname} ${user.lname}`}</h3>
                    <p className="text-muted">{`${user.gender}, ${user.age}`}</p>
                    {/* <p>{user.aboutme}</p> */}
                  </div>
                </div>
              </div>
              <div className="col-md-11 mx-auto about-content-details">
                <div className="row">
                  <div className="about-content-left-sec card mx-auto col-md-5 mt-5 shadow-sm">
                    <div className="">
                      <div className="user-detail-list">
                        <table className="table user-view-table m-0">
                          <tbody>
                            <tr>
                              <td>Name :</td>
                              <td>{`${user.fname} ${user.lname}`}</td>
                            </tr>
                            <tr>
                              <td>City :</td>
                              <td>{user.city}</td>
                            </tr>
                            <tr>
                              <td>State :</td>
                              <td>{user.state}</td>
                            </tr>
                            <tr>
                              <td>Country :</td>
                              <td>{user.country}</td>
                            </tr>
                            <tr>
                              <td>Age :</td>
                              <td>{user.age}</td>
                            </tr>
                            <tr>
                              <td>Gender :</td>
                              <td>{user.gender}</td>
                            </tr>
                            <tr>
                              <td>Looking For :</td>
                              <td>{user.lookingfor}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5 mt-5 ">
                    <p>About Me:</p>
                  <div className="about-content-right-sec card shadow-sm mx-auto">
                  {user.aboutme}
                  </div>
                  </div>
                </div>
              </div>
            </div>
            : null}
        </div>
      </div>
    </React.Fragment >
  );
};

export default About;
