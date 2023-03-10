import React from "react";
import { Routes, Route } from "react-router-dom";
import Registration from "./Components/Registration/Register";
import Login from "./Components/Authentication/Login";
import Layout from "./Components/Pages/Layout";
import LinkPage from "./Components/Pages/LinkPage";
import Home from "./Components/Pages/Home";
import Lounge from "./Components/Pages/Lounge";
import Missing from "./Components/Pages/Missing";
import Unauthorized from "./Components/Pages/Unauthorized";
import Admin from "./Components/Pages/Admin";
import Editor from "./Components/Pages/Editor";
import RequireAuth from "./Components/Pages/RequireAuth";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="register" element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* private routes */}
        <Route element={<RequireAuth allowedRoles={[2001]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[1984]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[5150]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[1984, 5150]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};

export default App;
