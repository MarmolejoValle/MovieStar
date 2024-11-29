import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../../components/Footer";

export const Disconts = () => {
  return (
    <>
      <div className="flex bg-azulprincipal">
        <Sidebar />
        <div className="flex-grow ml-28 text-white text-center">
          <h1 className="mt-16 font-semibold text-5xl">Promociones</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Disconts;
