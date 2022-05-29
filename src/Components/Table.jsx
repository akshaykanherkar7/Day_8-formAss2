import React from "react";
import TableItem from "./TableItem";

const Table = ({ dbdata ,handleDelete}) => {
  return (
    <div>
      <TableItem dbdata={dbdata} handleDelete={handleDelete}></TableItem>
    </div>
  );
};

export default Table;
