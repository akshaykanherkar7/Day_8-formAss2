import React, { useState, useEffect } from "react";
import Table from "./Table";
import styles from "./Form.module.css";
import {
  FormControl,
  FormLabel,
  Button,
  ButtonGroup,
  Input,
} from "@chakra-ui/react";

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
      <h1 style={{ fontSize: "30px" }}>Form</h1>
      <form className={styles.formbody}>
        <div>
          <FormControl>
            <FormLabel htmlFor="email">Name</FormLabel>
            <Input
              id="email"
              type="text"
              placeholder="Enter the Name"
              name="name"
              value={form.name}
              onChange={handleonChange}
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <FormLabel htmlFor="email">Age</FormLabel>
            <Input
              id="email"
              type="number"
              placeholder="Enter Age"
              name="age"
              value={form.age}
              onChange={handleonChange}
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <FormLabel htmlFor="email">Address</FormLabel>
            <Input
              id="email"
              type="text"
              name="address"
              value={form.address}
              placeholder="Enter Address"
              onChange={handleonChange}
            />
          </FormControl>
        </div>
        <div
          style={{
            marginTop: "10px",
            border: "0.5px solid lightgrey",
            borderRadius: "5px",
          }}
        >
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
          <FormControl>
            <FormLabel htmlFor="email">Salary</FormLabel>
            <Input
              id="email"
              type="number"
              name="salary"
              value={form.salary}
              placeholder="Enter Salary"
              onChange={handleonChange}
            />
          </FormControl>
        </div>
        <div
          style={{
            marginTop: "10px",
            border: "0.5px solid lightgrey",
            borderRadius: "5px",
          }}
        >
          <input
            type="checkbox"
            name="mar_status"
            check={form.mar_status}
            onChange={handleonChange}
          />
          <label>Marital Status</label>
        </div>
        <div>
          <FormControl>
            <FormLabel>Profile Photo</FormLabel>
            <Input
              accept="image/*"
              type="file"
              name="photo"
              file={form.photo}
              onChange={handleonChange}
            />
          </FormControl>
        </div>
        {/* <input type="submit" /> */}
        <Button
          onClick={handleSubmit}
          colorScheme="blue"
          style={{ marginTop: "15px" }}
        >
          Submit
        </Button>
      </form>
      <div>
        <Table dbdata={dbdata.form}></Table>
      </div>
    </div>
  );
};

export default Form;
