import React, { Component } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../../components/Footer";
import { Line } from "../components/graphic";
import CardRow from "../components/Card";
export const Graphics = () => {
  return (
    <>
      <div className="flex bg-azulprincipal">
        <Sidebar />
        <div className="flex-grow ml-10 text-white text-center mb-4">
          <h1 className="mt-16 font-semibold text-5xl">Estadísticas</h1>
          <div className="w-full h-fit flex flex-col justify-start   mt-7 ">
            <div className="p-2  bg-gray-600">
              <div className="flex text-center pl-20">
                <div className="p-4">
                  <img className="" src="data:image/jpeg;base64,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" alt="" />
                </div>
                <div className="p-3 flex flex-col justify-center">
                  <h3 className="font-medium text-2xl">Caballero de la noche</h3>
                  <p className="font-extralight">Accion,crimen,drama</p>
                </div>
              </div>
            </div>
            <div className="  flex ">
              <div className="flex-1 ">
                <CardRow image={'https://cdn1.epicgames.com/offer/b2818b59c0bb420e9647983dfd254931/EGS_Octopus_InsomniacGamesNixxesSoftware_S2_1200x1600-5831c61378872a1fe233b295fbf3140f'} title={'Spiderman'} />
              </div>
              <div className="flex-1 text-white mt-10">
                <div className="w-full p-3 ">
                  <p className="text-left ml-4 bg-slate-400 p-5 text-xl rounded-sm text-gray-800">Utilidades : <strong>100</strong> </p>
                </div>
                <div>
                  <h4>Ventas</h4>
                  <Line />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Graphics;