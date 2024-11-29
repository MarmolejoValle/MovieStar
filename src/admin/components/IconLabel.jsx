import { NavLink } from "react-router-dom";

export const IconLabel = ({ Icon, value, id, boolean, urlRoute, funtion }) => {
  return (
    <NavLink
      to={urlRoute}
      onClick={funtion}
      className={({ isActive }) =>
        `flex items-center mt-4 mb-4 duration-75 px-2 ${
          isActive
            ? "bg-azulclaro text-white font-bold border-l-4 border-white"
            : "hover:border-l-4 hover:border-gray-400"
        } ${
            id == 'menu'
            ? "border-none cursor-default"
            : "border-white"
        }`
      }
      id={id}
    >
      <Icon size={30} className="mr-4 ml-1 flex-shrink-0" />
      <span
        className={`text-sm transition-opacity duration-200 ${
          boolean ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {value}
      </span>
    </NavLink>
  );
};
