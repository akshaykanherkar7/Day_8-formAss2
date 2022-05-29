import React, { useState, useEffect } from "react";
import Table from "./Table";
import styles from "./Form.module.css";
import axios from "axios";
import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";

const Form = () => {
  const [form, setForm] = useState({});
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState();

  const handleonChange = (e) => {
    let { type, name, value, checked } = e.target;

    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleDelete = (id) => {
    setData(data.filter((el) => el.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3008/form", form).then((res) => {
      setData([...data, res.data]);
      console.log(res.data);
    });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:3008/form?_sort=salary&_order=${sort}&_page=${page}&_limit=5`
      )
      .then((res) => {
        setData(res.data);
        setTotalCount(Number(res.headers["x-total-count"]));
      });
  }, [sort, page]);

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
              type="url"
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
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="asc">Ascending</option>
        <option value="desc">Decending</option>
      </select>
      <div>
        <Table handleDelete={handleDelete} dbdata={data}></Table>
      </div>
      <div className={styles.pageDiv}>
        <button
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          style={
            page <= 1
              ? { backgroundColor: "lightgray", color: "gray" }
              : { backgroundColor: "teal", color: "white" }
          }
        >{`<`}</button>
        <button
          disabled={totalCount < page * 5}
          onClick={() => setPage(page + 1)}
          style={
            totalCount < page * 5
              ? { backgroundColor: "lightgray", color: "gray" }
              : { backgroundColor: "teal", color: "white" }
          }
        >{`>`}</button>
      </div>
    </div>
  );
};

export default Form;
