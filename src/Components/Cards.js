import React from "react";
import { APIURL } from '../config';
import avatar from '../assets/images/avatar.png';

const Card = (props) => {
  const { user } = props;
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
