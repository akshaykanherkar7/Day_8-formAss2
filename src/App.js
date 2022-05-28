import { useState } from "react";
import "./App.css";
import Form from "./Components/Form";
import dbdata from "./db.json"

function App() {
  const [jsdata,setJsdata] = useState(dbdata);
  return (
    <div className="App">
    <Form dbdata={jsdata} setJsdata={setJsdata}/>
    </div>
  );
}

export default App;
