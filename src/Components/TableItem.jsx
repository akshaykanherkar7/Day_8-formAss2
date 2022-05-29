import React from "react";
import styles from "./TableItem.module.css";

const TableItem = ({ dbdata, handleDelete }) => {
  return (
    <div>
      <table className={styles.brdr}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Marrird_Status</th>
            <th>Profile Photo</th>
          </tr>
        </thead>
        <tbody>
          {dbdata.map((el) => (
            <tr key={el.id}>
              <td>{el.name}</td>
              <td>{el.age}</td>
              <td>{el.address}</td>
              <td>{el.department}</td>
              <td>{el.salary}</td>
              <td>{el.mar_status ? "Yes" : "No"}</td>
              <td>
                <img
                  src={el.photo}
                  alt="profpic"
                  style={{ width: "200px", height: "100px" }}
                />
              </td>
              <td>
                <button onClick={() => handleDelete(el.id)}>
                  <i
                    style={{ fontSize: "50px" }}
                    class="fa-solid fa-delete-left"
                  ></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableItem;
