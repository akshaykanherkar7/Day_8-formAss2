import React from "react";
import TableItem from "./TableItem";

const Table = ({ dbdata }) => {
  return (
    <div>
      <TableItem dbdata={dbdata}></TableItem>
    </div>
  );
};

export default Table;
