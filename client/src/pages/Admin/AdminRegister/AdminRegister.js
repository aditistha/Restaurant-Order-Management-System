import React from "react";
import "./AdminRegister.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../../../api/userAction";

function AdminRegister() {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState("select");
  const [isChecked, setIsChecked] = useState(false);
  const [radio1, setRadio1] = useState("");
  const [radio2, setRadio2] = useState("");

  const refreshPage = () => {
    navigate(0);
  }
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    password: "",
    phone: "",
    address: "",
    job_title: "",
    hire_date: "",
    salary_information: "",
    employee_status: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser(values)
      .then((response) => {
        console.log(response.data);
        refreshPage();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleDropdownChange = (event) => {
    setDropdown(event.target.value);
    setValues((prevValues) => ({
      ...prevValues,
      job_title: event.target.value,
    }));
  };

  const handleRadioChange = (event) => {
    setRadio1(event.target.value);
    setValues((prevValues) => ({
      ...prevValues,
      gender: event.target.value,
    }));
  };

  const handleRadioChange2 = (event) => {
    setRadio2(event.target.value);
    setValues((prevValues) => ({
      ...prevValues,
      employee_status: event.target.value,
    }));
  };

  return (
    <div className="register d-flex justify-content-center align-items-center vh-110">
      <div className="glass1 p-3 rounded">
        <div className="mb-5">
          <h2>Register</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-row justify-content-around">
            <div className="mb-3">
              <label htmlFor="name">
                <strong>First Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                name="firstname"
                onChange={handleChange}
                value={values.firstname}
                className="form-control rounded-0"
                autoComplete="off"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Last Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                name="lastname"
                onChange={handleChange}
                value={values.lastname}
                className="form-control rounded-0"
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div className="d-flex flex-row justify-content-around">
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={handleChange}
                value={values.email}
                className="form-control rounded-0"
                autoComplete="off"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleChange}
                value={values.password}
                className="form-control rounded-0"
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div className="d-flex flex-row justify-content-around">
            <div className="mb-3">
              <label htmlFor="phone">
                <strong>Address</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Address"
                name="address"
                onChange={handleChange}
                value={values.address}
                className="form-control rounded-0"
                autoComplete="off"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone">
                <strong>Phone number</strong>
              </label>
              <input
                type="number"
                placeholder="Enter Phone number"
                name="phone"
                onChange={handleChange}
                value={values.phone}
                className="form-control rounded-0"
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className="mb-3 d-flex justify-content-around">
            <label htmlFor="gender" className=" mr-5">
              <strong>Gender:</strong>
            </label>

            {/* <div className="form-check form-check-inline mb-3"> */}
            <input
              className="form-check-input"
              type="radio"
              id="male"
              value="Male"
              checked={radio1 === "Male"}
              onChange={handleRadioChange}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              Male
            </label>
            <input
              className="form-check-input"
              type="radio"
              id="female"
              value="Female"
              checked={radio1 === "Female"}
              onChange={handleRadioChange}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              Female
            </label>
            {/* </div> */}
          </div>

          <div className="mb-3 d-flex justify-content-around">
            <label htmlFor="job_title" className=" mr-5">
              <strong>Job title:</strong>
            </label>

            <select value={dropdown} onChange={handleDropdownChange}>
              <option value="select">Select :</option>
              <option value="admin">Admin</option>
              <option value="kitchen">Kitchen</option>
              <option value="cashier">Cashier</option>
            </select>
          </div>

          <div className="d-flex flex-row justify-content-around">
            <div className="mb-3">
              <label htmlFor="date">
                <strong>Date of hire</strong>
              </label>
              <input
                type="date"
                placeholder="Enter Date"
                name="hire_date"
                onChange={handleChange}
                value={values.hire_date}
                className="form-control rounded-0"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="salary">
                <strong>Salary Information</strong>
              </label>
              <input
                type="number"
                placeholder="Enter salary"
                name="salary_information"
                onChange={handleChange}
                value={values.salary_information}
                className="form-control rounded-0"
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className="mb-3 d-flex justify-content-around">
            <label htmlFor="employee_status" className=" mr-5">
              <strong>Employee Status:</strong>
            </label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                checked={radio2 === "Part-time"}
                value="Part-time"
                onChange={handleRadioChange2}
              />
              <label className="form-check-label" htmlFor="inlineCheckbox2">
                Part-time
              </label>
            </div>
            <div className="form-check form-check-inline mb-3">
              <input
                className="form-check-input"
                type="radio"
                checked={radio2 === "Full-time"}
                value="Full-time"
                onChange={handleRadioChange2}
              />
              <label className="form-check-label" htmlFor="inlineCheckbox2">
                Full-time
              </label>
            </div>
          </div>

          <p>
            {" "}
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => {
                setIsChecked(e.target.checked);
              }}
            />{" "}
            I have read and accept the terms and policies{" "}
          </p>

          <button
            type="submit"
            className="btn btn1 w-50 rounded-12 mb-3"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister;
