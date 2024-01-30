import React, { useState } from 'react';
import './profile.css';

const UserDashboard = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    role: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... (your form submission logic)
  };

  return (
    <div className="container-xl px-4 mt-4" id="profile">
      <div className="row1">
        <div className="col-xl-12 text-center">
          <div className="card mb-4">
            <div className="card-header1">Profile Picture</div>
            <div className="card-body">
              <img
                className="img-account-profile rounded-circle mb-2"
                src="http://bootdey.com/img/Content/avatar/avatar1.png"
                alt="profile"
              />
              <div className="small font-italic text-muted mb-4">
                JPG or PNG no larger than 5 MB
              </div>
              <button className="btn btn-primary" style={{color:"white"}} type="button">
                Upload image
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row2">
        <div className="col-xl-6">
          <div className="card mb-4">
            <div className="card-header2">Account Details</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3 row45">
                    <label className="small mb-1" htmlFor="inputFirstName">
                      First Name
                    </label>
                    <input
                      className="form-control"
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter First Name"
                      value={userData.firstName}
                      onChange={(e) =>
                        setUserData({ ...userData, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-3 row45">
                    <label className="small mb-1" htmlFor="inputLastName">
                      Last Name
                    </label>
                    <input
                      className="form-control"
                      id="inputLastName"
                      type="text"
                      placeholder="Enter Last Name"
                      value={userData.lastName}
                      onChange={(e) =>
                        setUserData({ ...userData, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="mb-3 row45">
                  <label className="small mb-1" htmlFor="inputEmail">
                    Email
                  </label>
                  <input
                    className="form-control"
                    id="inputEmail"
                    type="email"
                    placeholder="Enter Email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3 row45" >
                  <label className="small mb-1" htmlFor="inputPassword">
                    Password
                  </label>
                  <input
                    className="form-control"
                    id="inputPassword"
                    type="password"
                    placeholder="Enter Password"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-xl-6 row45">
          <div className="card mb-4">
            <div className="card-header2">Personal Details</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 row45">
                  <label className="small mb-1" htmlFor="inputDateOfBirth">
                    Date of Birth
                  </label>
                  <input
                    className="form-control"
                    id="inputDateOfBirth"
                    type="date"
                    placeholder="Enter Date of Birth"
                    value={userData.dateOfBirth}
                    onChange={(e) =>
                      setUserData({ ...userData, dateOfBirth: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3 row45">
                  <label className="small mb-1" htmlFor="inputAge">
                    Age
                  </label>
                  <input
                    className="form-control"
                    id="inputAge"
                    type="number"
                    placeholder="Enter Age"
                    value={userData.age}
                    onChange={(e) =>
                      setUserData({ ...userData, age: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3 row45">
                  <label className="small mb-1" htmlFor="inputGender">
                    Gender
                  </label>
                  <select
                    className="form-control"
                    id="inputGender"
                    value={userData.gender}
                    onChange={(e) =>
                      setUserData({ ...userData, gender: e.target.value })
                    }
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="mb-3 row45">
                  <label className="small mb-1" htmlFor="inputRole">
                    Role
                  </label>
                  <input
                    className="form-control"
                    id="inputRole"
                    type="text"
                    placeholder="Enter Role"
                    value={userData.role}
                    onChange={(e) =>
                      setUserData({ ...userData, role: e.target.value })
                    }
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
