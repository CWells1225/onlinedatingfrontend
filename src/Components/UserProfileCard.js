import React from "react";
import { APIURL } from '../config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avatar from '../assets/images/avatar.png';

const UserProfileCard = (props) => {
  const { user } = props;

  const handleLike = () => {
    console.log('ID >> ', user._id);
    const token = localStorage.getItem('token');
    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("Authorization", `Bearer ${token}`);

    const body = JSON.stringify({ user_id: user._id })
    const requestOptions = {
      method: 'POST',
      headers: reqHeaders,
      redirect: 'follow',
      body
    };
    fetch(`${APIURL}/api/user/like`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          toast.error(result.msg)
        } else {
          toast.success(result.msg)
        }
      })
      .catch(error => {
        toast.error(error.message);
      });
  }

  const handleDislike = () => {
    const token = localStorage.getItem('token');
    const reqHeaders = new Headers();
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("Authorization", `Bearer ${token}`);
    const body = JSON.stringify({ user_id: user._id })
    const requestOptions = {
      method: 'POST',
      headers: reqHeaders,
      redirect: 'follow',
      body
    };
    fetch(`${APIURL}/api/user/dislike`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          toast.error(result.msg)
        } else {
          toast.success(result.msg)
        }
      })
      .catch(error => {
        toast.error(error.message);
      });
  }

  return (
    <React.Fragment>
      <div className="col-md-3">
        <div className="panel widget user-profile-card">
          <div className="half-float">
            <img
              src="https://bootdey.com/img/Content/bg1.jpg"
              alt="profile-background"
              className="img-responsive profile-background"
            />
            <div className="half-float-bottom">
              <img
                src={user && user.avatar ? `${APIURL}/uploads/${user.avatar}` : avatar}
                alt="profile-img"
                className="img-thumbnail"
              />
            </div>
          </div>
          <div className="panel-body text-center">
            <h3 className="m0">{`${user.fname} ${user.lname}`}</h3>
            <p className="text-muted">{`${user.gender}, ${user.age}`}</p>
            <p>{user.aboutme}</p>
          </div>
          <div className="panel-body text-center profile-footer">
            <div className="row-table">
              <div className="col-xs-4">
                <button onClick={handleLike} type="button" class="btn btn-warning col-md-6 btn-sm">
                  Like
                </button>
              </div>
              <div className="col-xs-4">
                <button onClick={handleDislike} type="button" class="btn btn-warning col-md-6 btn-sm">
                  Dislike
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default UserProfileCard;
