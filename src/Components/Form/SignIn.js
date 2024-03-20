import React, { useState } from "react";
import { APIURL } from '../../config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import lovebg from '../../assets/images/lovebg.jpg';

const SignIn = () => {

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const submitForm = () => {
    console.log(formData);
    const { email, password } = formData;
    if (!email || !password) {
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
      fetch(`${process.env.REACT_APP_APIURI}/api/login`, requestOptions)
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
      <div className="sign-in-form-wrapper" style={{ background: `url(${lovebg})`, padding: "50px" }}>
        <div className="sign-in-form-outer">
          <section className="col-md-5 mx-auto my-5">
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
                  <div className="col-xl-12 sign-in-form-detail">
                    <div className="card-body">
                      <div className="sign-in-form-fields">
                        <h3 className="form-heading text-center">Sign In</h3>
                        <div className="col-md-12">
                          <div className="form-outline">
                            <label
                              className="form-label"
                            >
                              Email
                            </label>
                            <input
                              type="text"
                              name="email"
                              onChange={e => handleChange(e)}
                              className="form-control "
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-outline">
                            <label
                              className="form-label"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              name="password"
                              onChange={e => handleChange(e)}
                              className="form-control "
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center pt-3">
                          <button
                            type="button"
                            onClick={submitForm}
                            className="btn btn-warning col-md-6 btn-md "
                          >
                            Sign in
                          </button>
                        </div>
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

export default SignIn;
