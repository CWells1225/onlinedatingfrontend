import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from "./Cards";

const MyMatches = () => {

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
    fetch(`${process.env.REACT_APP_APIURI}/api/user/matches`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          toast.error(result.msg)
        } else {
          const data = result.data
          setList(data);
        }
      })
      .catch(error => {
        toast.error(error.message);
      });
  }, [])

  return (
    <React.Fragment>
      <div className="my-matches-wrapper">
        <div className="container-fluid">
          <div className="col-md-12 mt-5">
            <div className="row">
              {list && list.map((item, index) => {
                return <Card user={item} key={index} />
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyMatches;
