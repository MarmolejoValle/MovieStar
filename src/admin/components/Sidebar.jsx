import { IoIosMenu } from "react-icons/io";
import { RiBarChartGroupedLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { IconLabel } from "./IconLabel";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdMovie } from "react-icons/md";
import { useState } from "react";

export const Sidebar = () => {
  const [labelVision, setLabelVision] = useState({
    vision: false,
    width: "w-14", // Inicialmente contraído
  });

  const expandSidebar = () => {
    setLabelVision({
      vision: true,
      width: "w-44",
    });
  };

  const collapseSidebar = () => {
    setLabelVision({
      vision: false,
      width: "w-14",
    });
  };

  return (
    <div
      className={`ml-4 mr-4 h-[90vh] mt-8 sticky top-0 justify-start items-center`}
    >
      <nav
        id="barNav"
        className={`bg-azulsecundario text-white ${labelVision.width} h-[calc(100vh-4rem)] flex flex-col justify-between rounded-xl duration-75`}
        onMouseEnter={expandSidebar}
        onMouseLeave={collapseSidebar}
      >
        <div className="flex flex-col mt-3" id="menu">
          <IconLabel
            Icon={IoIosMenu}
            value={"Menú"}
            id={"menu"}
            boolean={labelVision.vision}
          />
        </div>
        <div className="flex flex-col">
          <IconLabel
            Icon={MdMovie}
            value={"Contenido"}
            id={"Contenido"}
            boolean={labelVision.vision}
            urlRoute={"/Content"}
          />
          <IconLabel
            Icon={RiBarChartGroupedLine}
            value={"Estadísticas"}
            id={"Graphics"}
            boolean={labelVision.vision}
            urlRoute={"/Graphics"}
          />
          <IconLabel
            Icon={BiMoneyWithdraw}
            value={"Promociones"}
            id={"Promos"}
            boolean={labelVision.vision}
            urlRoute={"/Disconts"}
          />
        </div>
        <div className="flex flex-col mb-3" id="footer">
          <IconLabel
            Icon={CiLogout}
            value={"Cerrar"}
            id={"Salir"}
            boolean={labelVision.vision}
            urlRoute={"/"}
          />
          <div className="flex justify-center mt-4">
            <img
              src="/LOGO-MS.png"
              alt="Logo de la Empresa"
              className="top-8 px-8 h-auto w-auto"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
