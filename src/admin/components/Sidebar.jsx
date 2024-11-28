import { IoIosMenu } from "react-icons/io";
import { GiHandTruck, GiRiceCooker } from "react-icons/gi";
import { HiTruck } from "react-icons/hi2";
import { RiBarChartGroupedLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import { IconLabel } from "./IconLabel";

export const Sidebar = () => {
  const [labelVision, setLabelVision] = useState({ vision: false, width: "w-44" });

  const changeSize = () => {
    setLabelVision((prev) => ({
      vision: !prev.vision,
      width: prev.vision ? "w-44" : "w-14",
    }));
  };

  return (
    <>
      <div className={`${labelVision.wigth}  ml-4 mr-4 h-[90vh] mt-8 flex justify-center items-center`} >
        <nav id="barNav" style={{ backgroundColor: "red" }} className={`text-white ${labelVision.wigth} h-[90vh] fixed  flex flex-col justify-between  rounded-xl   duration-75`}>

          <div className="flex flex-col mt-3" id="menu" >
            <div onClick={changeSize}>
              <IconLabel Icon={IoIosMenu} value={"Menú"} id={"users"} boolean={labelVision.vision} />

            </div>

          </div>

          <div className="flex flex-col ">
            <IconLabel Icon={FaUsers} value={"Usuarios"} id={"Usuarios"} boolean={labelVision.vision} urlRoute={"/Users"} />
            <IconLabel Icon={RiBarChartGroupedLine} value={"Gráficas"} id={"users"} boolean={labelVision.vision} urlRoute={"/Graphics"} />
            <IconLabel Icon={HiTruck} value={"Pedidos"} id={"Pedidos"} boolean={labelVision.vision} urlRoute={"/Ordens"} />
            <IconLabel Icon={GiRiceCooker} value={"Extras"} id={"Extras"} boolean={labelVision.vision} urlRoute={"/Extras"} />
            <IconLabel Icon={GiHandTruck} value={"Inventario"} id={"users"} boolean={labelVision.vision} urlRoute={"/Inventory"} />
          </div>
          <div className="flex flex-col mb-3" id="footer">

            <IconLabel Icon={CiLogout} value={"Cerrar Sesión"} id={"Salir"} boolean={labelVision.vision} urlRoute={"/"} />
            <div className="flex justify-center mt-4">
              <img style={{ width: "16px" , height: "15px" }}
                src="/LOGO-MS.png"
                alt="Logo de la Empresa"
                className="absolute top-8 left-16 h-20 w-auto"
              />

            </div>
          </div>

        </nav>
      </div>
    </>
  );
};

export default Sidebar;