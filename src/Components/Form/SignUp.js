import React, { useState } from "react";
import { APIURL } from '../../config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import lovebg from '../../assets/images/lovebg.jpg';
// import dotenv from 'dotenv'; 
// dotenv.config();


const SignUp = (props) => {
 
  const [formData, setFormData] = useState({ gender: 'male' });

  const handleChange = (e) => {
    console.log(e.target.value)
    console.log(e.target.name)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const submitForm = () => {
    const { fname, lname, email, password, age, gender, lookingfor, city, state, country } = formData;

    if (!fname || !lname || !email || !password || !age || !gender || !lookingfor || !city || !state || !country) {
      toast.error("All fields are required!");
    } else {
      const reqHeaders = new Headers();
      reqHeaders.append("Content-Type", "application/json");
      const body = JSON.stringify(formData);
      const requestOptions = {
        method: 'POST',
        headers: reqHeaders,
        redirect: 'follow',
        body
      };
      
      fetch(`${process.env.REACT_APP_APIURI}/api/register`, requestOptions)
        .then(response => response.json())
        .then(result => {
          if (result.error) {
            toast.error(result.msg)
          } else {
            toast.success(result.msg);
            const token = result.data.access_token;
            localStorage.setItem("token", token);
            setTimeout(() => {
              window.location.href = "/dashboard";
            }, 1000);
          }
        })
        .catch(error => {
          toast.error(error.message);
        });
    }
  }

  return (
    <React.Fragment>
      <div className="sign-up-form-wrapper" style={{ background: `url(${lovebg})`, padding: "50px" }}>
        <div className="sign-up-form-outer">
          <section className="col-md-6 mx-auto my-5">
            <div className="sign-up-form">
              <div className="card card-registration">
                <div className="row g-0">
                  {/* <div className="col-xl-6 d-none d-xl-block">
                    <img
                      src={love}
                      alt="banner"
                      className="form-banner"
                    />
                  </div> */}
                  <div className="col-xl-12 sign-up-form-detail">
                    <div className="card-body">
                      <h3 className="form-heading text-center">Sign Up</h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">First Name</label>
                            <input type="text" name="fname" onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">Last Name</label>
                            <input type="text" name="lname" onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">Email</label>
                            <input type="text" name="email" onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">Password</label>
                            <input type="password" name="password" onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">Age</label>
                            <input type="text" name="age" onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">Gender</label>
                            <select className="form-control" onChange={e => handleChange(e)} name="gender">
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
                            <input type="text" name="lookingfor" onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">City</label>
                            <input type="text" name="city" onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">State</label>
                            <input type="text" name="state" onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-outline">
                            <label className="form-label">Country</label>
                            <input type="text" name="country" onChange={e => handleChange(e)} className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center pt-3">
                        <button type="button" onClick={submitForm} className="btn btn-warning col-md-6 btn-md">Sign Up</button>
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

export default SignUp;
