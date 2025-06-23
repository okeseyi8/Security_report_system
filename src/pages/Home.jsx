import React, { useState } from "react";
import Header from "../components/Header";
import BackgroudSlideshow from "../features/backgroudSlideshow";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import PublicRoute from "../router/PublicRoute";
import { useAuthStore } from "../store/useAuthStore";

const Home = () => {
  const showForm = useAuthStore((state) => state.showForm)
  return (
    <div className="">
      <BackgroudSlideshow>
        <Header />
        {showForm ? (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ) : (
          <PublicRoute>
            <Login />
          </PublicRoute>
        )}
      </BackgroudSlideshow>
    </div>
  );
};

export default Home;
