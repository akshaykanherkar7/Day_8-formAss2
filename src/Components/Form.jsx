import React, { useState, useEffect } from "react";
import Table from "./Table";
import styles from "./Form.module.css";

// name: "",
//     age: null,
//     address: "",
//     department: "",
//     salary: null,
//     prof_url: "",

const Form = ({ dbdata }) => {
  const [form, setForm] = useState({});
  //   console.log(dbdata.form);

  const [data, setData] = useState([]);

  const handleonChange = (e) => {
    let { type, name, value, checked } = e.target;

    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3008/form", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        setData([...data, res]);
      });
    window.location.reload();
  };

  useEffect(() => {
    //run last END me
    fetch("http://localhost:3008/form")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        // console.log(res);
      });
  }, []);

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit} className={styles.formbody}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            placeholder="Enter the Name"
            name="name"
            value={form.name}
            onChange={handleonChange}
          />
        </div>
        <div>
          <label>Age: </label>
          <input
            type="number"
            placeholder="Enter Age"
            name="age"
            value={form.age}
            onChange={handleonChange}
          />
        </div>
        <div>
          <label>Address: </label>
          <input
            type="text"
            name="address"
            value={form.address}
            placeholder="Enter Address"
            onChange={handleonChange}
          />
        </div>
        <div>
          <label>Select Department: </label>
          <select
            name="department"
            value={form.department}
            onChange={handleonChange}
          >
            <option value="Not Selected">Select</option>
            <option value="it">IT</option>
            <option value="network">Networking</option>
            <option value="bpo">BPO</option>
          </select>
        </div>
        <div>
          <label>Salary: </label>
          <input
            type="number"
            name="salary"
            value={form.salary}
            placeholder="Enter Salary"
            onChange={handleonChange}
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="mar_status"
            check={form.mar_status}
            onChange={handleonChange}
          />
          <label>Marital Status</label>
        </div>
        <div>
          <p>Profile Photo </p>
          <input
            accept="image/*"
            type="file"
            name="photo"
            file={form.photo}
            onChange={handleonChange}
          />
        </div>
        <input type="submit" />
      </form>
      <div>
        <Table dbdata={dbdata.form}></Table>
      </div>
    </div>
  );
};

export default Form;
