import { Outlet } from "react-router-dom";
import NavbarPage from "./NavbarPage";

const Layout = () => {
  return (
    <>
      <NavbarPage />
      <Outlet />
    </>
  );
};

export default Layout;
