import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { RouteAddCategory, RouteCategoryDetail, RouteEditCategory, RouteIndex, RouteProfile, RouteSignIn, RouteSignUp } from "./helpers/RouteName";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AddCategory from "./pages/Category/AddCategory";
import CategoryDetail from "./pages/Category/CategoryDetail";
import EditCategory from "./pages/Category/EditCategory";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />}></Route>
          <Route path={RouteProfile} element={<Profile />}></Route>
          <Route path={RouteAddCategory} element={<AddCategory />}></Route>
          <Route path={RouteCategoryDetail} element={<CategoryDetail />}></Route>
          <Route path={RouteEditCategory()} element={<EditCategory />}></Route>
        </Route>

        <Route path={RouteSignIn} element={<SignIn/>} />
        <Route path={RouteSignUp} element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
