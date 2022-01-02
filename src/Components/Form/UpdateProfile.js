import React, { useEffect, useState } from "react";
import { APIURL } from '../../config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avatar from '../../assets/images/avatar.png';

const UpdateProfile = () => {

  const [user, setUser] = useState()
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const reqHeaders = new Headers();
      reqHeaders.append("Content-Type", "application/json");
      reqHeaders.append("Authorization", `Bearer ${token}`);
      const requestOptions = {
        method: 'GET',
        headers: reqHeaders,
        redirect: 'follow',
      };
      fetch(`${APIURL}/api/user/userData`, requestOptions)
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
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const updateAvatar = event => {
    const image = document.getElementById("profile-img");
    image.src = URL.createObjectURL(event.target.files[0]);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    const token = localStorage.getItem('token');
    const reqHeaders = new Headers();
    reqHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: 'POST',
      headers: reqHeaders,
      redirect: 'follow',
      body: formData
    };
    fetch(`${APIURL}/api/user/uploadAvatar`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          toast.error(result.msg)
        } else {
          toast.success(result.msg);
        }
      })
      .catch(error => {
        toast.error(error.message);
      });
  }

  const updateProfile = () => {
    console.log("User >> ", user)
    const token = localStorage.getItem('token');
    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("Authorization", `Bearer ${token}`);
    let { fname, lname, age, gender, lookingfor, city, state, country, aboutme } = user;
    gender = gender ? gender : 'male';
    const body = JSON.stringify({ fname, lname, age, gender, lookingfor, city, state, country, aboutme });
    const requestOptions = {
      method: 'PUT',
      headers: reqHeaders,
      redirect: 'follow',
      body
    };
    fetch(`${APIURL}/api/user/updateProfile`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          toast.error(result.msg)
        } else {
          toast.success(result.msg);
        }
      })
      .catch(error => {
        toast.error(error.message);
      });
  }
  return (
    <React.Fragment>
      <div className="update-profile-form-wrapper">
        <div className="update-profile-form-outer">
          <section className="col-md-7 mx-auto my-5">
            <div className="sign-up-form">
              <div className="card card-registration">
                <div className="row g-0">
                  <div className="col-xl-6 border-end">
                    <div className="half-float">
                      <img
                        src={"https://bootdey.com/img/Content/bg1.jpg"}
                        alt="profile-background"
                        className="img-responsive profile-background"
                      />
                      <div className="half-float-bottom change-profile">
                        <div className="profile-pic">
                          <label className="-label" htmlFor="file">
                            <span className="glyphicon glyphicon-camera"></span>
                            <span>Change Image</span>
                          </label>
                          <input
                            id="file"
                            type="file"
                            onChange={(event) => updateAvatar(event)}
                          />
                          <img
                            src={user && user.avatar ? `${APIURL}/uploads/${user.avatar}` : avatar}
                            id="profile-img"
                            alt="profile-img"
                            className="img-thumbnail"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="panel-body text-center mt-4">
                      <h3 className="m0">{user && user.fname} {user && user.lname}</h3>
                      <p className="text-muted">{user && user.gender} {user && user.age}</p>
                    </div>
                    {/* <div className="d-flex justify-content-center pt-3">
                      <button
                        type="button"
                        className="btn btn-warning col-md-6 btn-md "
                      >
                        Change Profile
                      </button>
                    </div> */}
                  </div>

                  <div className="col-xl-6 sign-up-form-detail">
                    <div className="card-body">
                      <h3 className="form-heading text-center">
                        Update Profile
                      </h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">First Name</label>
                            <input type="text" name="fname" value={user && user.fname} onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">Last Name</label>
                            <input type="text" name="lname" value={user && user.lname} onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">Age</label>
                            <input type="text" name="age" value={user && user.age} onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">Gender</label>
                            <select className="form-control" value={user && user.gender} onChange={e => handleChange(e)} name="gender">
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">Looking For</label>
                            <input type="text" name="lookingfor" value={user && user.lookingfor} onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">City</label>
                            <input type="text" name="city" value={user && user.city} onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">State</label>
                            <input type="text" name="state" value={user && user.state} onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">Country</label>
                            <input type="text" name="country" value={user && user.country} onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-outline">
                            <label className="form-label">About Me</label>
                            <textarea row="3" name="aboutme" value={user && user.aboutme} onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center pt-3">
                        <button
                          type="button"
                          className="btn btn-warning col-md-6 btn-md "
                          onClick={updateProfile}
                        >
                          Update Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UpdateProfile;
