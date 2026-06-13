import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/tasks" element={<Tasks />}/>
      <Route path="/create-task" element={<CreateTask />}/>
      <Route path="/edit-task/:id" element={<EditTask />}/>
    </Routes>
  );
}

export default App;










// import './App.css'

// function App() {
  

//   return (
//     <>
      
//     </>
//   )
// }

// export default App
