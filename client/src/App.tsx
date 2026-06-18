import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import Login from "./pages/LogIn";
import Register from "./pages/Register";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element=
      {<PublicRoute><Login /></PublicRoute>}/>
      <Route path="/sign-in" element=
      {<PublicRoute><Login /></PublicRoute>}/>
      <Route path="/register" element=
      {<PublicRoute><Register /></PublicRoute>} />
      <Route path="/create-account" element=
      {<PublicRoute><Register /></PublicRoute>} />
      <Route path="/sign-up" element=
      {<PublicRoute><Register /></PublicRoute>} />
      <Route path="/tasks" element=
      {<ProtectedRoute><Tasks /></ProtectedRoute>}/>
      <Route path="/create-task" element=
      {<ProtectedRoute><CreateTask /></ProtectedRoute>}/>
      <Route path="/edit-task/:id" element=
      {<ProtectedRoute><EditTask /></ProtectedRoute>}/>
    </Routes>
  );
}

export default App;